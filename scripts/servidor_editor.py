#!/usr/bin/env python3
"""
SERVIDOR LOCAL DE EDIÇÃO & SINCRONIZAÇÃO EM TEMPO REAL
Prefeitura da Cidade do Rio de Janeiro
Guia de Boas Práticas de Acessibilidade Digital
"""

import http.server
import socketserver
import json
import os
import re
import sys
import webbrowser
import subprocess
import html
from html.parser import HTMLParser

PORT = 8000
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GUIASITE_DIR = os.path.join(BASE_DIR, "guiasite")

class TocExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []
        self.current_section = None
        self.in_heading = False
        self.heading_text = ''
        self.current_article = None
        self.in_subheading = False
        self.subheading_text = ''

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        classes = attrs_dict.get('class', '').split()
        tag_id = attrs_dict.get('id', '')

        if tag == 'section' and 'content-section' in classes:
            self.current_section = {'id': tag_id, 'title': '', 'subs': []}
            self.sections.append(self.current_section)

        if self.current_section:
            if tag == 'h2' and 'section-heading' in classes:
                self.in_heading = True
                self.heading_text = ''
            elif tag == 'article' and tag_id:
                self.current_article = {'id': tag_id, 'title': ''}
                self.current_section['subs'].append(self.current_article)
            elif tag in ('h3', 'h4') and ('subsection-heading' in classes or self.current_article):
                self.in_subheading = True
                self.subheading_text = ''

    def handle_data(self, data):
        if self.in_heading:
            self.heading_text += data
        elif self.in_subheading:
            self.subheading_text += data

    def handle_endtag(self, tag):
        if tag == 'h2' and self.in_heading:
            self.in_heading = False
            if self.current_section:
                self.current_section['title'] = self.heading_text.strip()
        elif tag in ('h3', 'h4') and self.in_subheading:
            self.in_subheading = False
            if self.current_article and not self.current_article['title']:
                self.current_article['title'] = self.subheading_text.strip()
        elif tag == 'article':
            self.current_article = None
        elif tag == 'section' and self.current_section:
            self.current_section = None

def build_toc_html(sections):
    lines = ['<ul class="toc-tree">']
    for s_idx, sec in enumerate(sections, 1):
        sec_id = sec['id'] or f"capitulo-{s_idx}"
        title = html.escape(sec['title'] or f"Capítulo {s_idx}")
        lines.append('    <li class="toc-tree-item">')
        lines.append(f'      <a href="#{sec_id}" class="toc-link">{s_idx}. {title}</a>')
        if sec['subs']:
            lines.append('      <ul class="toc-sublist">')
            for sub_idx, sub in enumerate(sec['subs'], 1):
                sub_id = sub['id']
                sub_title = html.escape(sub['title'] or f"Tópico {s_idx}.{sub_idx}")
                lines.append(f'        <li><a href="#{sub_id}" class="toc-link">{s_idx}.{sub_idx} {sub_title}</a></li>')
            lines.append('      </ul>')
        lines.append('    </li>')
    lines.append('      </ul>')
    return '\n'.join(lines)


class EditorRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=GUIASITE_DIR, **kwargs)

    def do_POST(self):
        if self.path == "/api/save":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            
            try:
                data = json.loads(body)
                html_content = data.get("html", "")
                
                if not html_content or len(html_content.strip()) < 50:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "Conteudo invalido ou vazio"}).encode("utf-8"))
                    return

                # Atualiza guiasite/index.html no disco
                index_path = os.path.join(GUIASITE_DIR, "index.html")
                with open(index_path, "r", encoding="utf-8") as f:
                    index_html = f.read()

                main_start = '<main class="main-content" id="conteudo-principal">'
                main_end = '</main>'

                start_pos = index_html.find(main_start)
                end_pos = index_html.find(main_end, start_pos)

                if start_pos != -1 and end_pos != -1:
                    new_index_html = (
                        index_html[:start_pos + len(main_start)] +
                        "\n" + html_content + "\n" +
                        index_html[end_pos:]
                    )

                    # Atualiza o sumário estático <ul class="toc-tree"> também
                    try:
                        parser = TocExtractor()
                        parser.feed(html_content)
                        if parser.sections:
                            new_toc_html = build_toc_html(parser.sections)
                            new_index_html = re.sub(
                                r'<ul class=["\']toc-tree["\']>[\s\S]*?</ul>(?=\s*</nav>)',
                                new_toc_html,
                                new_index_html
                            )
                    except Exception as toc_err:
                        print(f"[Aviso] Erro ao sincronizar sumário estático: {toc_err}")

                    with open(index_path, "w", encoding="utf-8") as f:
                        f.write(new_index_html)
                    
                    # Atualiza os arquivos do tema WordPress também
                    build_script = os.path.join(BASE_DIR, "scripts", "build_wordpress_theme.py")
                    if os.path.exists(build_script):
                        try:
                            subprocess.run([sys.executable, build_script], cwd=BASE_DIR, check=False)
                        except Exception as e:
                            print(f"[Aviso] Nao foi possivel rodar build_wordpress_theme: {e}")

                    self.send_response(200)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "success": True,
                        "message": "Arquivo index.html e tema WordPress atualizados com sucesso no disco!"
                    }).encode("utf-8"))
                    print("[Sucesso] guiasite/index.html e sumário atualizados pelo editor no disco!")
                else:
                    self.send_response(500)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "Tags <main> nao encontradas em index.html"}).encode("utf-8"))

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), EditorRequestHandler) as httpd:
        print("=" * 70)
        print("  SERVIDOR DO GUIA DE ACESSIBILIDADE - PREFEITURA DO RIO")
        print("=" * 70)
        print(f"  Portal do Guia:       http://localhost:{PORT}/index.html")
        print(f"  Painel do Editor:     http://localhost:{PORT}/admin.html")
        print("=" * 70)
        print("  Ao clicar em 'Salvar' no painel, o arquivo index.html sera")
        print("  atualizado diretamente no seu computador em tempo real!")
        print("=" * 70)
        print("  Pressione Ctrl + C para encerrar o servidor.")
        print()
        
        # Abre o editor automaticamente no navegador padrao
        webbrowser.open(f"http://localhost:{PORT}/admin.html")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")

if __name__ == "__main__":
    run_server()
