#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Conversor do Guia de Acessibilidade Digital
Prefeitura da Cidade do Rio de Janeiro - Subsecretaria de Transformação Digital

Converte o arquivo markdown exportado do Google Docs (GuiaAcessibilidade.md)
para a estrutura completa do portal (guiasite/index.html e guiasite/js/app.js),
incluindo:
1. Extração de imagens em base64 para assets/images/
2. Geração hierárquica de Capítulos (H2), Subtópicos (H3) e Itens (H4)
3. Construção automática do Sumário Lateral (TOC) com links e scrollspy
4. Construção do banco de pesquisa preditiva (searchDatabase) em app.js
5. Formatação acessível de tabelas, figuras, callouts e notas de rodapé
"""

import os
import sys
import re
import base64
import unicodedata
from pathlib import Path

# Garante saída UTF-8 no terminal Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# Diretórios padrão
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
GUIASITE_DIR = PROJECT_ROOT / "guiasite"
ASSETS_IMG_DIR = GUIASITE_DIR / "assets" / "images"
INDEX_HTML_PATH = GUIASITE_DIR / "index.html"
APP_JS_PATH = GUIASITE_DIR / "js" / "app.js"
DEFAULT_MD_PATH = PROJECT_ROOT / "GuiaAcessibilidade.md"

def slugify(text):
    """Gera um identificador ID limpo e seguro para a URL."""
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '-', text)

def extract_base64_images(md_content, output_dir):
    """Extrai todas as imagens em base64 e salva como arquivos PNG."""
    output_dir.mkdir(parents=True, exist_ok=True)
    images_map = {}
    
    # Procura definições [imageX]: <data:image/png;base64,...> ou sem chevron
    pattern = re.compile(r'^\[(image\d+)\]:\s*<?data:image\/([a-zA-Z]+);base64,([A-Za-z0-9+/=\r\n]+)>?', re.MULTILINE)
    
    for match in pattern.finditer(md_content):
        img_id = match.group(1)
        ext = match.group(2)
        b64_data = re.sub(r'\s+', '', match.group(3))
        
        file_name = f"{img_id}.{ext}"
        file_path = output_dir / file_name
        
        try:
            with open(file_path, "wb") as f:
                f.write(base64.b64decode(b64_data))
            images_map[img_id] = f"assets/images/{file_name}"
        except Exception as e:
            print(f"⚠️ Erro ao decodificar {img_id}: {e}")
            
    # Remove as linhas de dados base64 do final do markdown para limpar o texto
    cleaned_md = pattern.sub('', md_content)
    return cleaned_md, images_map

def clean_inline_formatting(text):
    """Converte formatação inline básica de markdown para HTML seguro."""
    # Links especiais do Google Docs: <<https://...>> ou [texto](url)
    text = re.sub(r'\\<\\<\[?(https?://[^\]>\s]+)\]?\\>\\>', r'<a href="\1" target="_blank" rel="noopener noreferrer">\1</a>', text)
    text = re.sub(r'\[([^\]]+)\]\((https?://[^\)]+)\)', r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', text)
    
    # Negrito e Itálico
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    
    # Notas de rodapé no corpo: [^1]
    text = re.sub(r'\[\^(\d+)\]', r'<sup id="fnref\1"><a href="#fn\1" class="footnote-backlink" aria-describedby="fn\1">[\1]</a></sup>', text)
    
    return text.strip()

def parse_markdown(md_content, images_map):
    """Analisa o markdown estruturado e retorna seções, notas de rodapé e índice."""
    lines = md_content.splitlines()
    
    chapters = []
    current_chapter = None
    current_subsection = None
    current_topic = None
    footnotes = {}
    
    footnote_def_pattern = re.compile(r'^\[\^(\d+)\]:\s*(.*)')
    
    i = 0
    total_lines = len(lines)
    
    while i < total_lines:
        line = lines[i].strip()
        
        # Ignora linhas vazias
        if not line:
            i += 1
            continue
            
        # Notas de rodapé: [^1]: texto
        fn_match = footnote_def_pattern.match(line)
        if fn_match:
            fn_id = fn_match.group(1)
            fn_text = fn_match.group(2).strip()
            # Se a nota continuar nas linhas seguintes
            i += 1
            while i < total_lines and (lines[i].startswith("    ") or lines[i].startswith("\t")):
                fn_text += " " + lines[i].strip()
                i += 1
            footnotes[fn_id] = clean_inline_formatting(fn_text)
            continue
            
        # Título Principal (H1)
        if line.startswith("# ") and not line.startswith("## "):
            i += 1
            continue
            
        # Capítulo (H2)
        if line.startswith("## "):
            title = re.sub(r'^\*+|\*+$', '', line[3:].strip()).rstrip(':')
            if not title:
                i += 1
                continue
            chapter_slug = slugify(title)
            current_chapter = {
                "title": title,
                "slug": chapter_slug,
                "subsections": [],
                "content_blocks": []
            }
            chapters.append(current_chapter)
            current_subsection = None
            current_topic = None
            i += 1
            continue
            
        # Subseção (H3) ou Capítulo Elevado
        if line.startswith("### "):
            title = re.sub(r'^\*+|\*+$', '', line[4:].strip()).rstrip(':')
            if not title:
                i += 1
                continue
            # Verifica se é um tema maior que deve ser elevado a capítulo
            elevate_keywords = [
                'conteúdo textual', 'conteúdo imagético', 'estrutura da página',
                'navegabilidade', 'dicas de design', 'tipos de deficiência e acessibilidade'
            ]
            if any(k in title.lower() for k in elevate_keywords):
                chapter_slug = slugify(title)
                current_chapter = {
                    "title": title,
                    "slug": chapter_slug,
                    "subsections": [],
                    "content_blocks": []
                }
                chapters.append(current_chapter)
                current_subsection = None
                current_topic = None
            else:
                sub_slug = slugify(title)
                current_subsection = {
                    "title": title,
                    "slug": sub_slug,
                    "topics": [],
                    "content_blocks": []
                }
                if current_chapter:
                    current_chapter["subsections"].append(current_subsection)
                current_topic = None
            i += 1
            continue
            
        # Tópico menor (H4)
        if line.startswith("#### "):
            title = re.sub(r'^\*+|\*+$', '', line[5:].strip()).rstrip(':')
            if not title:
                i += 1
                continue
            topic_slug = slugify(title)
            current_topic = {
                "title": title,
                "slug": topic_slug,
                "content_blocks": []
            }
            if current_subsection:
                current_subsection["topics"].append(current_topic)
            elif current_chapter:
                # Se não havia subseção ativa, cria uma subseção para este H4
                current_subsection = {
                    "title": title,
                    "slug": topic_slug,
                    "topics": [],
                    "content_blocks": []
                }
                current_chapter["subsections"].append(current_subsection)
            i += 1
            continue

        # Itens Numerados de Diretrizes (ex: 1. [**Parágrafos:**](url) ou 2. **Tamanho...:**)
        num_match = re.match(r'^\d+\.\s*\[?\*+([^*]+?)\*+\]?(?:\([^)]*\))?:?', line)
        if num_match and current_chapter:
            item_title = num_match.group(1).strip().rstrip(':')
            if len(item_title) > 3 and not item_title.lower().startswith("http"):
                sub_slug = slugify(item_title)
                current_subsection = {
                    "title": item_title,
                    "slug": sub_slug,
                    "topics": [],
                    "content_blocks": []
                }
                current_chapter["subsections"].append(current_subsection)
                current_topic = None
                i += 1
                continue
            
        # Imagens: ![][imageX]
        img_match = re.search(r'!\[(.*?)\]\[(image\d+)\]', line)
        if img_match:
            alt_text = img_match.group(1).strip()
            img_id = img_match.group(2)
            src = images_map.get(img_id, f"assets/images/{img_id}.png")
            block = {
                "type": "figure",
                "src": src,
                "alt": alt_text or f"Gráfico e infográfico do Guia de Acessibilidade ({img_id})"
            }
            target = current_topic or current_subsection or current_chapter
            if target:
                target["content_blocks"].append(block)
            i += 1
            continue
            
        # Tabela em Markdown
        if line.startswith("|"):
            table_lines = []
            while i < total_lines and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            table_block = parse_markdown_table(table_lines)
            target = current_topic or current_subsection or current_chapter
            if target and table_block:
                target["content_blocks"].append(table_block)
            continue
            
        # Listas com marcadores (* ou -)
        if line.startswith("* ") or line.startswith("- "):
            list_items = []
            while i < total_lines and (lines[i].strip().startswith("* ") or lines[i].strip().startswith("- ")):
                item_text = re.sub(r'^[\*\-]\s+', '', lines[i].strip())
                list_items.append(clean_inline_formatting(item_text))
                i += 1
            target = current_topic or current_subsection or current_chapter
            if target:
                target["content_blocks"].append({"type": "list", "items": list_items})
            continue
            
        # Parágrafo normal ou Callout
        p_text = clean_inline_formatting(line)
        target = current_topic or current_subsection or current_chapter
        if target:
            target["content_blocks"].append({"type": "p", "text": p_text})
            
        i += 1
        
    return chapters, footnotes

def parse_markdown_table(lines):
    """Converte tabela markdown em estrutura acessível com thead e th scope='col'."""
    if len(lines) < 2:
        return None
        
    def split_row(r):
        return [c.strip() for c in r.strip("|").split("|")]
        
    header_cells = split_row(lines[0])
    rows = []
    
    for l in lines[2:]: # Pula a linha separadora |--|--|
        cells = split_row(l)
        if any(c for c in cells):
            rows.append([clean_inline_formatting(c) for c in cells])
            
    return {
        "type": "table",
        "headers": [clean_inline_formatting(h) for h in header_cells],
        "rows": rows
    }

def render_html_content(chapters, footnotes):
    """Gera o HTML semântico dos capítulos e o sumário lateral."""
    toc_html_parts = []
    content_html_parts = []
    search_entries = []
    
    chapter_num = 1
    for ch in chapters:
        ch_title = ch["title"]
        ch_slug = ch["slug"]
        
        # Item do Sumário para o Capítulo
        sublist_parts = []
        
        # HTML do Capítulo
        ch_html = [f'<!-- ==========================================\n     CAPÍTULO {chapter_num}: {ch_title.upper()}\n     ========================================== -->']
        ch_html.append(f'<section class="content-section" id="{ch_slug}">')
        ch_html.append(f'  <span class="section-badge">Capítulo {chapter_num}</span>')
        ch_html.append(f'  <h2 class="section-heading">{ch_title}</h2>')
        
        # Conteúdo direto do capítulo
        for block in ch["content_blocks"]:
            ch_html.append(render_block(block))
            
        # Subseções
        sub_num = 1
        for sub in ch["subsections"]:
            sub_title = sub["title"]
            sub_slug = sub["slug"]
            
            sublist_parts.append(f'        <li><a href="#{sub_slug}" class="toc-link">{chapter_num}.{sub_num} {sub_title}</a></li>')
            
            # Entrada de busca
            search_entries.append({
                "id": sub_slug,
                "title": f"{sub_title}",
                "category": ch_title.split(":")[0].strip()[:14],
                "categoryClass": get_category_class(ch_title),
                "keywords": generate_keywords(sub_title, sub["content_blocks"]),
                "snippet": generate_snippet(sub["content_blocks"])
            })
            
            ch_html.append(f'  <article id="{sub_slug}">')
            ch_html.append(f'    <h3 class="subsection-heading">{sub_title}</h3>')
            
            for block in sub["content_blocks"]:
                ch_html.append(render_block(block, indent="    "))
                
            # Tópicos H4
            for top in sub["topics"]:
                top_title = top["title"]
                top_slug = top["slug"]
                
                search_entries.append({
                    "id": top_slug,
                    "title": f"{top_title}",
                    "category": sub_title.split(":")[0].strip()[:14],
                    "categoryClass": get_category_class(ch_title),
                    "keywords": generate_keywords(top_title, top["content_blocks"]),
                    "snippet": generate_snippet(top["content_blocks"])
                })
                
                ch_html.append(f'    <div class="topic-block" id="{top_slug}">')
                ch_html.append(f'      <h4 class="topic-heading">{top_title}</h4>')
                for block in top["content_blocks"]:
                    ch_html.append(render_block(block, indent="      "))
                ch_html.append('    </div>')
                
            ch_html.append('  </article>')
            sub_num += 1
            
        ch_html.append('</section>\n')
        content_html_parts.append("\n".join(ch_html))
        
        # Monta item do TOC
        toc_item = [f'    <li class="toc-tree-item">', f'      <a href="#{ch_slug}" class="toc-link">{chapter_num}. {ch_title}</a>']
        if sublist_parts:
            toc_item.append('      <ul class="toc-sublist">')
            toc_item.extend(sublist_parts)
            toc_item.append('      </ul>')
        toc_item.append('    </li>')
        toc_html_parts.append("\n".join(toc_item))
        
        chapter_num += 1
        
    # Renderiza Notas de Rodapé ao final se existirem
    if footnotes:
        fn_html = ['<section class="content-section" id="notas-de-rodape">',
                   '  <span class="section-badge">Referências</span>',
                   '  <h2 class="section-heading">Notas de Rodapé</h2>',
                   '  <ol class="footnotes-list">']
        for fn_id, fn_text in footnotes.items():
            fn_html.append(f'    <li id="fn{fn_id}">{fn_text} <a href="#fnref{fn_id}" class="footnote-backref" aria-label="Voltar à referência {fn_id}">↩</a></li>')
        fn_html.append('  </ol>')
        fn_html.append('</section>')
        content_html_parts.append("\n".join(fn_html))
        
    return "\n".join(toc_html_parts), "\n".join(content_html_parts), search_entries

def render_block(block, indent="  "):
    """Renderiza um bloco estrutural em HTML semântico com classes de estilo."""
    b_type = block["type"]
    
    if b_type == "p":
        text = block["text"]
        # Detecta chamadas de destaque para transformar em Callouts
        if text.startswith("<strong>Importante:") or text.startswith("<strong>Atenção:"):
            return f'{indent}<div class="callout callout-warning">\n{indent}  <div class="callout-title">Atenção</div>\n{indent}  <p>{text}</p>\n{indent}</div>'
        elif text.startswith("<strong>Dica:") or text.startswith("<strong>Recomendação:"):
            return f'{indent}<div class="callout callout-success">\n{indent}  <div class="callout-title">Recomendação</div>\n{indent}  <p>{text}</p>\n{indent}</div>'
        elif text.startswith("<strong>Lei") or "13.146" in text and "Estatuto" in text:
            return f'{indent}<div class="callout callout-law">\n{indent}  <div class="callout-title">Marco Legal</div>\n{indent}  <p>{text}</p>\n{indent}</div>'
        return f'{indent}<p>{text}</p>'
        
    elif b_type == "figure":
        src = block["src"]
        alt = block["alt"]
        return (f'{indent}<figure class="content-figure">\n'
                f'{indent}  <div class="figure-img-wrap" tabindex="0" role="button" aria-label="Ampliar infográfico">\n'
                f'{indent}    <img src="{src}" alt="{alt}" loading="lazy" />\n'
                f'{indent}    <span class="figure-zoom-btn" aria-hidden="true">🔍 Clique para ampliar</span>\n'
                f'{indent}  </div>\n'
                f'{indent}  <figcaption>{alt}</figcaption>\n'
                f'{indent}</figure>')
                
    elif b_type == "list":
        items = block["items"]
        html = [f'{indent}<ul class="guidelines-list">']
        for it in items:
            html.append(f'{indent}  <li>{it}</li>')
        html.append(f'{indent}</ul>')
        return "\n".join(html)
        
    elif b_type == "table":
        headers = block["headers"]
        rows = block["rows"]
        html = [f'{indent}<div class="table-responsive">',
                f'{indent}  <table class="accessible-table">',
                f'{indent}    <thead>',
                f'{indent}      <tr>']
        for h in headers:
            html.append(f'{indent}        <th scope="col">{h}</th>')
        html.append(f'{indent}      </tr>')
        html.append(f'{indent}    </thead>')
        html.append(f'{indent}    <tbody>')
        for r in rows:
            html.append(f'{indent}      <tr>')
            for c in r:
                html.append(f'{indent}        <td>{c}</td>')
            html.append(f'{indent}      </tr>')
        html.append(f'{indent}    </tbody>')
        html.append(f'{indent}  </table>')
        html.append(f'{indent}</div>')
        return "\n".join(html)
        
    return ""

def get_category_class(title):
    t = title.lower()
    if "visual" in t or "imagem" in t: return "category-visual"
    if "auditivo" in t or "libras" in t or "som" in t: return "category-auditivo"
    if "cognitivo" in t or "tea" in t or "tdah" in t or "dislexia" in t: return "category-cognitivo"
    if "texto" in t or "fonte" in t or "contraste" in t: return "category-textual"
    if "norma" in t or "wcag" in t or "emag" in t: return "category-normas"
    if "censo" in t or "demografia" in t: return "category-censo"
    return "category-estrutura"

def generate_keywords(title, blocks):
    clean_title = re.sub(r'[^\w\s]', ' ', title.lower())
    words = clean_title.split()
    for b in blocks:
        if b["type"] == "p":
            text = re.sub(r'<[^>]+>', ' ', b["text"].lower())
            words.extend([w for w in text.split() if len(w) > 4][:8])
            break
    # Remove duplicatas preservando ordem
    return " ".join(dict.fromkeys(words[:12]))

def generate_snippet(blocks):
    for b in blocks:
        if b["type"] == "p":
            clean = re.sub(r'<[^>]+>', '', b["text"])
            if len(clean) > 160:
                return clean[:157] + "..."
            return clean
    return "Consulte as diretrizes completas desta seção no guia de acessibilidade."

def update_site_files(toc_html, content_html, search_entries):
    """Atualiza o index.html e app.js mantendo todo o design e scripts intactos."""
    if not INDEX_HTML_PATH.exists():
        print(f"❌ Arquivo não encontrado: {INDEX_HTML_PATH}")
        return False
        
    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()
        
    # Atualiza o Sumário Lateral
    toc_pattern = re.compile(r'(<ul class="toc-tree">)(.*?)(</ul>\s*</nav>)', re.DOTALL)
    if toc_pattern.search(html):
        html = toc_pattern.sub(r'\1\n' + toc_html + r'\n      \3', html)
    else:
        print("⚠️ Tag <ul class=\"toc-tree\"> não localizada com exatidão.")
        
    # Atualiza o Conteúdo Principal
    content_pattern = re.compile(r'(<main class="main-content" id="conteudo-principal">)(.*?)(</main>)', re.DOTALL)
    if content_pattern.search(html):
        html = content_pattern.sub(r'\1\n\n' + content_html + r'\n\n    \3', html)
    else:
        print("⚠️ Tag <main class=\"main-content\"> não localizada com exatidão.")
        
    with open(INDEX_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
        
    # Atualiza o searchDatabase no app.js
    if APP_JS_PATH.exists():
        with open(APP_JS_PATH, "r", encoding="utf-8") as f:
            js = f.read()
            
        import json
        entries_json = json.dumps(search_entries, ensure_ascii=False, indent=2)
        js_pattern = re.compile(r'(const searchDatabase = )\[.*?\];', re.DOTALL)
        if js_pattern.search(js):
            js = js_pattern.sub(f'\\1{entries_json};', js)
            with open(APP_JS_PATH, "w", encoding="utf-8") as f:
                f.write(js)
            print("🔍 Banco de pesquisa preditiva (searchDatabase) atualizado em app.js.")
            
    return True

def main():
    md_file = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_MD_PATH
    
    if not md_file.exists():
        print(f"❌ Arquivo de entrada não encontrado: {md_file}")
        sys.exit(1)
        
    print(f"🚀 Iniciando conversão de: {md_file.name}")
    
    with open(md_file, "r", encoding="utf-8") as f:
        raw_md = f.read()
        
    print("🖼️  Extraindo imagens em base64...")
    cleaned_md, images_map = extract_base64_images(raw_md, ASSETS_IMG_DIR)
    print(f"    -> {len(images_map)} imagens salvas em {ASSETS_IMG_DIR}")
    
    print("📑 Analisando hierarquia e diretrizes do documento...")
    chapters, footnotes = parse_markdown(cleaned_md, images_map)
    print(f"    -> {len(chapters)} capítulos encontrados")
    print(f"    -> {len(footnotes)} notas de rodapé identificadas")
    
    print("🎨 Gerando HTML semântico e sumário hierárquico...")
    toc_html, content_html, search_entries = render_html_content(chapters, footnotes)
    print(f"    -> {len(search_entries)} tópicos indexados para a busca em tempo real")
    
    print("💾 Gravando alterações em guiasite/index.html e guiasite/js/app.js...")
    if update_site_files(toc_html, content_html, search_entries):
        print("✅ Sucesso! O portal do Guia de Acessibilidade foi atualizado com êxito!")

if __name__ == "__main__":
    main()
