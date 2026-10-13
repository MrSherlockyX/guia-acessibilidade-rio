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

DEFAULT_ALT_TEXTS = {
    "image1": "Gráfico do Censo 2010 (IBGE) sobre população com deficiência no Brasil (23,9%)",
    "image2": "Gráfico do Censo 2010 (IBGE) sobre pessoas com deficiência severa no Brasil (8,3%)",
    "image3": "Gráfico do Censo 2022 (IBGE) com comparativo da população com deficiência",
    "image4": "Gráfico do Censo 2022 (IBGE) demonstrando comparativo metodológico entre os censos",
    "image5": "Infográfico das Sete Dimensões de Acessibilidade segundo Romeu Kazumi Sassaki",
    "image6": "Gráfico da pesquisa BID (2025) sobre autoconfiança no uso de tecnologias e serviços públicos digitais",
    "image7": "Exemplo ilustrativo de percepção de cores e daltonismo",
    "image8": "Exemplo comparativo de contraste e espectro de cores para daltonismo"
}

ART_SPECS = {
    1: {
        "title": "Censo IBGE 2010 — População Geral com Deficiência",
        "topic": "2.2 Tipos de Deficiência",
        "description": "Infográfico com destaque estatístico para os 23,9% da população brasileira (45.606.048 pessoas de um total de 190.755.799 habitantes) que declararam possuir pelo menos uma deficiência em algum grau no Censo 2010. Detalhamento por tipos: Visual (18,6%), Motora (7,0%), Auditiva (5,1%) e Mental/Intelectual (1,4%).",
        "elements": "Gráfico de barras estilizadas com pictogramas acessíveis para cada tipo de deficiência (olho, cadeira de rodas, ouvido, cérebro/mente). Tipografia destacada para '23,9%'.",
        "palette": "Azul institucional Prefeitura do Rio (#002B49 e #004A80), ciano (#00C0F3) e neutros de alto contraste.",
        "guidelines": "Garantir contraste de texto mínimo de 4.5:1 sobre o fundo. Não diferenciar os tipos de deficiência apenas pela cor das barras."
    },
    2: {
        "title": "Censo IBGE 2010 — Comparação: Deficiência Geral (23,9%) vs. Severa (8,3%)",
        "topic": "2.2 Tipos de Deficiência",
        "description": "Infográfico comparativo demonstrando o recorte entre a população geral com alguma deficiência (23,9%) e aquelas com deficiência severa (8,3%, representando pessoas com muita dificuldade ou incapacidade total). Apresenta a maior prevalência entre mulheres e o recorte regional: Estado do RJ (24,4%) e Cidade do Rio de Janeiro (24,7%, quase 1/4 da população carioca).",
        "elements": "Diagrama comparativo com dois blocos ou funil infográfico. Ícone sutil da Cidade do Rio de Janeiro contextualizando os 24,7%.",
        "palette": "Azul escuro (#001F33), azul intermediário (#1565C0) e destaque em amarelo ouro ou ciano.",
        "guidelines": "Textos explicativos nítidos acompanhando os números percentuais."
    },
    3: {
        "title": "Censo IBGE 2022 — Nova Classificação e Metodologia Washington Group",
        "topic": "2.2 Tipos de Deficiência",
        "description": "Quadro explicativo sobre a mudança de metodologia do Censo 2022: incorporação de novas perguntas e critérios mais restritivos do Washington Group. Passou a contabilizar exclusivamente casos graves e permanentes (excluindo temporários e moderados), além da divisão entre questionário básico e estendido.",
        "elements": "Matriz com os tipos avaliados (locomoção, visão, audição, cognição e autocuidado) e caixa de aviso sobre o critério de gravidade permanente.",
        "palette": "Fundo neutro claro, bordas estruturadas em azul ardósia (#9DBDCE) e ícones semânticos.",
        "guidelines": "Tipografia legível sem serifa; ícones com rótulos de texto explícitos."
    },
    4: {
        "title": "Comparativo Censo 2010 vs. 2022 — A Queda Estatística e a Subnotificação no Rio",
        "topic": "2.2 Tipos de Deficiência",
        "description": "Gráfico de impacto mostrando a discrepância estatística decorrente da mudança de metodologia: queda do percentual de pessoas com deficiência na Cidade do Rio de Janeiro de 24,7% (2010) para 6,9% (2022), e cerca de 30 milhões a menos no Brasil. Alerta para o risco de subnotificação em políticas públicas frente ao envelhecimento populacional.",
        "elements": "Duas colunas comparativas para a Cidade do Rio: Barra 2010 (24,7%) vs Barra 2022 (6,9%), com anotação de 'Subnotificação Estatística' e dados da PNAD 2022 sobre salto de deficiências a partir dos 40 e 60 anos.",
        "palette": "Azul marinho (#002B49) para 2010, cinza/azul suave para 2022 e linha de alerta âmbar (#92400E).",
        "guidelines": "Incluir nota explicativa clara de que a queda reflete mudança de cálculo e não redução real da população que necessita de acessibilidade."
    },
    5: {
        "title": "As 7 Dimensões da Acessibilidade (Romeu Kazumi Sassaki)",
        "topic": "2.4 Tipos de Acessibilidade",
        "description": "Diagrama conceitual integrando as sete dimensões de acessibilidade: 1. Arquitetônica (espaços físicos); 2. Comunicacional (linguagem simples, legendas, LIBRAS); 3. Metodológica (processos e métodos); 4. Instrumental (softwares e dispositivos); 5. Programática (leis e políticas); 6. Atitudinal (eliminação de preconceitos); 7. Digital/Tecnológica (serviços web e sistemas).",
        "elements": "Diagrama radial/circular com o cidadão ao centro e as 7 dimensões interligadas com ícones modernos.",
        "palette": "Tons harmoniosos da identidade visual do Rio: azul primário, ciano, verde esmeralda e ardósia.",
        "guidelines": "Cada dimensão deve conter ícone vetorial e um pequeno subtítulo explicativo com alto contraste."
    },
    6: {
        "title": "Pesquisa BID 2025 — Autoconfiança no Uso de Serviços Públicos Digitais",
        "topic": "2.6 Uso de Serviços Públicos Digitais",
        "description": "Gráfico baseado na pesquisa do Banco Interamericano de Desenvolvimento (BID, 2025): demonstra que mesmo com 94,2% de celulares conectados, a média de autoconfiança digital é de apenas 47,5%. A confiança cai para 24,2% entre pessoas com deficiência, 24,0% em idosos (+55 anos) e 26,7% em baixa escolaridade. 57,2% prefeririam atendimento presencial por insegurança no digital.",
        "elements": "Gráfico de barras horizontais contrastando a média geral (47,5%) com as populações mais vulneráveis (24%), com destaque para a frase-chave sobre autonomia.",
        "palette": "Azul cobalto (#004A80), vermelho/coral de alerta para barreiras e verde para autonomia.",
        "guidelines": "Indicar percentuais numéricos de forma clara e visível dentro ou ao lado de cada barra."
    },
    7: {
        "title": "Simulação Visual de Daltonismo — Espectro de Cores",
        "topic": "3.1 Deficiência Visual (Daltonismo)",
        "description": "Infográfico demonstrativo do espectro de cores visível para pessoas com diferentes tipos de daltonismo: Visão Tricromata (Normal), Protanopia (ausência de cones vermelhos), Deuteranopia (ausência de cones verdes), Tritanopia (dificuldade com azul/amarelo) e Acromatopsia (monocromática / escala de cinza).",
        "elements": "Barras horizontais paralelas exibindo o arco-íris comparado em cada uma das condições.",
        "palette": "Espectros simulados de Protanopia, Deuteranopia e Tritanopia com legendas descritivas.",
        "guidelines": "Apresentar rótulos textuais nítidos para cada espectro, permitindo que a diferença seja compreendida mesmo sem visualização colorida."
    },
    8: {
        "title": "Boas Práticas de Interface para Daltonismo: Não Dependa Apenas da Cor",
        "topic": "3.1 Deficiência Visual (Daltonismo)",
        "description": "Exemplo prático de componente de interface (formulário / status / gráfico) mostrando a abordagem incorreta (diferenciação baseada somente em cor verde/vermelho) versus a abordagem acessível (reforço simultâneo com ícones ✓ e ✕, texto descritivo e textura de traço).",
        "elements": "Layout 'Antes vs Depois' ou 'Evite vs Prefira' com cards lado a lado.",
        "palette": "Cores de interface com contornos definidos e ícones pretos/brancos de suporte.",
        "guidelines": "Excelente exemplo didático para designers e desenvolvedores front-end."
    },
    9: {
        "title": "Contraste Textual Mínimo — Diretrizes WCAG AA (4.5:1 e 3:1)",
        "topic": "5.7 Contraste textual",
        "description": "Demonstração visual das relações mínimas de contraste exigidas pela WCAG 2.2 Nível AA: 4.5:1 para texto normal e 3:1 para texto grande (18pt ou 14pt negrito). Comparativo com contraste insuficiente (reprovado) e contraste ampliado AAA (7:1).",
        "elements": "Cards de amostra tipográfica com indicador de medição de contraste e carimbo de 'Aprovado AA' ou 'Reprovado'.",
        "palette": "Exemplos com fundo branco (#FFFFFF) e fundos escuros (#0F172A), demonstrando ambos os modos.",
        "guidelines": "Indicar o valor numérico exato do cálculo de luminância em cada amostra."
    },
    10: {
        "title": "Comunicação Multissensorial — Informação Além da Cor",
        "topic": "5.9 Uso de cores",
        "description": "Exemplo de como transmitir mensagens essenciais, alertas de sistema e gráficos utilizando cor combinada com tipografia, ícones e formas geométricas, cumprindo a diretriz WCAG 1.4.1.",
        "elements": "Trio de status (Sucesso, Atenção, Erro) exibindo simultaneamente: cor + ícone semântico + rótulo textual.",
        "palette": "Verde esmeralda, amarelo âmbar e vermelho carmim sobre superfícies adequadas.",
        "guidelines": "Demonstrar que o usuário com qualquer alteração visual consegue entender a ação imediatamente."
    },
    11: {
        "title": "Anatomia de um Campo de Formulário Acessível",
        "topic": "5.11 Formulários",
        "description": "Diagrama anotado de um campo de entrada (input): rótulo visível <label> permanentemente associado pelo atributo 'for', texto de ajuda instrutivo, marcação de campo obrigatório e mensagem de validação de erro contextual com sugestão de correção.",
        "elements": "Mockup explodido de input com setas numeradas apontando para cada requisito de acessibilidade.",
        "palette": "Design de formulário moderno, limpo, alinhado ao padrão Governo Digital.",
        "guidelines": "Evitar uso exclusivo de placeholder como único rótulo."
    },
    12: {
        "title": "O Atributo 'alt' no Leitor de Tela — Imagens Informativas",
        "topic": "6.1 Imagens informativas",
        "description": "Ilustração do funcionamento da tecnologia assistiva: uma imagem de um atendimento ao público da Prefeitura do Rio sendo interpretada por um leitor de tela (NVDA/TalkBack), que sintetiza a fala com base no atributo alt descritivo.",
        "elements": "Foto/desenho com balão de fala sonoro contendo a descrição textual acessível.",
        "palette": "Cores quentes e acolhedoras para o atendimento humano, tons de azul para o sintetizador.",
        "guidelines": "Ressaltar a concisão (100 a 150 caracteres) e a riqueza contextual da descrição."
    },
    13: {
        "title": "Texto Real em HTML/CSS vs. Texto Embutido em Imagem Rasterizada",
        "topic": "6.4 Imagens com texto",
        "description": "Comparativo ilustrado: Banner promocional com texto 'achatado' dentro do arquivo de imagem (perda de qualidade ao ampliar, invisível para leitores de tela) versus Banner com imagem de fundo estilizada e texto real renderizado via HTML e CSS.",
        "elements": "Simulação de zoom 200%: lado esquerdo borrado/pixelado; lado direito 100% nítido, selecionável e responsivo.",
        "palette": "Contraste forte entre a imagem e as caixas de texto.",
        "guidelines": "Destacar a preservação de nitidez em telas de alta densidade (Retina/OLED)."
    },
    14: {
        "title": "Estrutura Semântica de Tabelas de Dados",
        "topic": "6.8 Tabelas",
        "description": "Diagrama de uma tabela acessível evidenciando a marcação de <caption> (título resumido da tabela), cabeçalhos de coluna <th> com scope='col', cabeçalhos de linha com scope='row' e células de dados <td>.",
        "elements": "Tabela tridimensional ou explodida com linhas de conexão demonstrando como o leitor de tela relaciona cada célula ao seu cabeçalho correspondente.",
        "palette": "Cabeçalhos em azul escuro (#002B49) e linhas zebradas suaves.",
        "guidelines": "Mostrar a lógica de leitura horizontal e vertical para leitores de tela."
    },
    15: {
        "title": "Anatomia de Legendas Acessíveis e Sincronizadas (Closed Captions / WebVTT)",
        "topic": "7.2 Uso de legendas",
        "description": "Demonstração visual de um player de vídeo acessível reproduzindo áudio perfeitamente sincronizado com legendas no padrão WebVTT. Evidencia as boas práticas: identificação explícita de quem fala entre colchetes (ex: '[Palestrante]'), descrição de informações sonoras contextuais não verbais (ex: '[música suave de fundo]', '[aplausos]'), quebra em até 2 linhas e fundo escuro semitransparente que garante legibilidade sobre cenas claras ou escuras. Alerta contra a dependência cega de legendas automáticas sem revisão humana.",
        "elements": "Mockup de player de vídeo com botões de controle, botão 'CC' ativado, caixa de legenda destacada e três balões explicativos apontando para: 1. Identificação do locutor; 2. Efeitos sonoros; 3. Contraste da caixa de texto.",
        "palette": "Interface do player em azul escuro (#0F172A), caixa de legenda preta (#000000) com texto branco (#FFFFFF) ou amarelo (#FFEB3B) e acentos em ciano (#00C0F3).",
        "guidelines": "Critério WCAG 1.2.2 (Legendas Pré-gravadas - Nível A). Nunca disponibilizar legendas geradas automaticamente sem revisão humana prévia."
    },
    16: {
        "title": "Enquadramento e Boas Práticas da Janela de LIBRAS em Vídeo",
        "topic": "7.5 Língua de sinais",
        "description": "Guia visual completo de produção para a janela de tradução em Língua Brasileira de Sinais (LIBRAS). Demonstração da área correta de enquadramento da câmera (da linha abaixo da cintura até acima da cabeça, com folga lateral abrangendo ambos os cotovelos para visualização ampla dos sinais e do espaço de sinalização), vestimenta e parede de fundo em tons sólidos contrastantes com a cor de pele do intérprete, e posicionamento no canto inferior direito do vídeo dimensionado para permitir visualização nítida de expressões faciais sem cobrir letreiros ou legendas.",
        "elements": "Ilustração de intérprete de LIBRAS com linhas guias de enquadramento (limites seguros: cabeça, cotovelos e cintura), iluminação frontal suave e inserção na tela principal de vídeo com indicação de área de segurança.",
        "palette": "Fundo de estúdio em azul marinho sóbrio (#002B49) ou cinza neutro, contraste luminoso com a pele e janela delimitada com traço sutil.",
        "guidelines": "Critério WCAG 1.2.6 (Língua de Sinais Pré-gravada - Nível AAA). Lembrete de que plugins automatizados (avatares 3D) não substituem a tradução humana nativa."
    },
    17: {
        "title": "Árvore de Hierarquia Semântica de Cabeçalhos (H1 a H4)",
        "topic": "8.1 Cabeçalhos",
        "description": "Diagrama em árvore mostrando a correta ordenação dos títulos em um portal: H1 (único, tema principal) -> H2 (capítulos/seções) -> H3 (subtópicos) -> H4 (detalhes). Alerta visual contra a prática incorreta de pular níveis (ex: H1 direto para H3).",
        "elements": "Organograma hierárquico com nós conectados e ícones de marcação semântica.",
        "palette": "Gradiente estruturado de azuis da Prefeitura do Rio, do mais escuro (H1) ao mais claro (H4).",
        "guidelines": "Excelente guia rápido de arquitetura da informação para criadores de conteúdo."
    },
    18: {
        "title": "Regiões Semânticas e Pontos de Referência (Landmarks HTML5)",
        "topic": "8.4 Conteúdo complementar",
        "description": "Wireframe de uma página web destacando as principais regiões semânticas: <header> (topo/banner), <nav> (navegação/menus), <main> (conteúdo principal único), <aside> (complementar/lateral) e <footer> (rodapé institucional).",
        "elements": "Esquema visual de página web com blocos codificados por cor e etiquetas de código semântico.",
        "palette": "Paleta de layout suave com contornos pontilhados em azul e ciano.",
        "guidelines": "Facilita o entendimento de como pessoas cegas saltam rapidamente entre seções da página."
    },
    19: {
        "title": "Indicador de Foco Visível para Navegação por Teclado",
        "topic": "9.1 Navegação por teclado",
        "description": "Demonstração de acessibilidade motora e visual: elemento interativo (botão ou link) recebendo foco pelo teclado (tecla Tab) com anel de destaque (:focus-visible) duplo e de alto contraste. Comparação com o erro comum de remover o contorno com 'outline: none'.",
        "elements": "Simulação de botão em 3 estados: Normal, Hover (mouse) e Foco Ativo pelo Teclado com anel iluminado de 3px.",
        "palette": "Botão em azul royal com anel de foco em ciano vívido (#00C0F3) e offset branco.",
        "guidelines": "Requisito indispensável para usuários que utilizam teclado, switches ou comando de voz."
    },
    20: {
        "title": "Reflow Responsivo — Adaptação Fluida a 320px sem Rolagem Horizontal",
        "topic": "10.3 Design para diferentes tamanhos de viewport",
        "description": "Ilustração do critério WCAG 1.4.10 (Reflow): o mesmo portal exibido em tela de Desktop (1280px) com múltiplas colunas e adaptado fluidamente para tela mobile estreita (320px de largura) ou zoom de 400%, sem perda de conteúdo e sem necessidade de barra de rolagem horizontal.",
        "elements": "Dois dispositivos lado a lado (Monitor vs Smartphone compacto) mostrando o rearranjo vertical natural dos blocos de conteúdo.",
        "palette": "Fundos claros com blocos de texto e botões redimensionados com área de toque mínima de 44x44px.",
        "guidelines": "Destacar a importância do design mobile-first e da tipografia responsiva com unidades relativas."
    }
}

def clean_inline_formatting(text):
    """Converte formatação inline básica de markdown para HTML seguro."""
    # Remove marcas de títulos residuais no meio do parágrafo (ex: 1) #### **Cegueira**)
    text = re.sub(r'#{2,}\s*', '', text)

    # Converte tags HTML com escape do Google Docs (ex: \<fieldset\>, \<legend\>, \`\<li\>\`) para <code>&lt;tag&gt;</code>
    text = re.sub(r'\\`?\\<([a-zA-Z0-9_-]+)\\>\\`?', r'<code>&lt;\1&gt;</code>', text)

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
            
        # Bloco de Arte / Caixa de Imagem personalizada
        if line.startswith("> **[ESPAÇO PARA ILUSTRAÇÃO") or line.startswith("> **[Arte") or line.startswith("> **[ARTE"):
            art_num_match = re.search(r'ARTE\s+(\d+)', line, re.IGNORECASE)
            art_id = int(art_num_match.group(1)) if art_num_match else 1
            art_lines = [line]
            i += 1
            while i < total_lines and lines[i].strip().startswith(">"):
                art_lines.append(lines[i].strip())
                i += 1
            
            block_text = "\n".join(art_lines)
            title_m = re.search(r'>\s*\*\*Título:\*\*\s*(.*)', block_text)
            desc_m = re.search(r'>\s*\*\*Descrição da Arte:\*\*\s*(.*)', block_text)
            elem_m = re.search(r'>\s*\*\*Elementos Visuais:\*\*\s*(.*)', block_text)
            pal_m = re.search(r'>\s*\*\*Paleta Sugerida:\*\*\s*(.*)', block_text)
            guide_m = re.search(r'>\s*\*\*Diretriz de Acessibilidade:\*\*\s*(.*)', block_text)
            
            spec_fallback = ART_SPECS.get(art_id, {})
            art_block = {
                "type": "art_card",
                "id": f"arte-{art_id}",
                "num": art_id,
                "title": title_m.group(1).strip() if title_m else spec_fallback.get("title", f"Ilustração {art_id}"),
                "desc": desc_m.group(1).strip() if desc_m else spec_fallback.get("description", ""),
                "elements": elem_m.group(1).strip() if elem_m else spec_fallback.get("elements", ""),
                "palette": pal_m.group(1).strip() if pal_m else spec_fallback.get("palette", ""),
                "guidelines": guide_m.group(1).strip() if guide_m else spec_fallback.get("guidelines", "")
            }
            target = current_topic or current_subsection or current_chapter
            if target:
                target["content_blocks"].append(art_block)
            continue

        # Bloco de código delimitado (``` ou ```html)
        if line.startswith("```"):
            lang = line[3:].strip() or "html"
            code_lines = []
            i += 1
            while i < total_lines and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            i += 1  # Pula fechamento ```
            code_content = "\n".join(code_lines)
            block = {
                "type": "code",
                "lang": lang,
                "code": code_content
            }
            target = current_topic or current_subsection or current_chapter
            if target:
                target["content_blocks"].append(block)
            continue

        # Imagens residuais na linha: converte para art_card
        img_matches = list(re.finditer(r'!\[(.*?)\]\[(image(\d+))\]', line))
        line_clean_for_img = re.sub(r'#|\*|_|\s|!\[.*?\]\[image\d+\]', '', line)
        if img_matches and len(line_clean_for_img) == 0:
            for match in img_matches:
                img_num = int(match.group(3))
                spec = ART_SPECS.get(img_num, {})
                block = {
                    "type": "art_card",
                    "id": f"arte-{img_num}",
                    "num": img_num,
                    "title": spec.get("title", f"Ilustração {img_num}"),
                    "desc": spec.get("description", ""),
                    "elements": spec.get("elements", ""),
                    "palette": spec.get("palette", ""),
                    "guidelines": spec.get("guidelines", "")
                }
                target = current_topic or current_subsection or current_chapter
                if target:
                    target["content_blocks"].append(block)
            i += 1
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
                'conteúdo textual', 'conteúdo imagético', 'conteúdo em vídeo', 'conteúdo em video',
                'estrutura da página', 'navegabilidade', 'dicas de design', 'tipos de deficiência e acessibilidade'
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
            
        # Imagens residuais no meio de texto: ![][imageX] -> converte para art_card
        if img_matches:
            for match in img_matches:
                img_num = int(match.group(3))
                spec = ART_SPECS.get(img_num, {})
                block = {
                    "type": "art_card",
                    "id": f"arte-{img_num}",
                    "num": img_num,
                    "title": spec.get("title", f"Ilustração {img_num}"),
                    "desc": spec.get("description", ""),
                    "elements": spec.get("elements", ""),
                    "palette": spec.get("palette", ""),
                    "guidelines": spec.get("guidelines", "")
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
        elif text.startswith("<strong>Incorreta:</strong>") or text.startswith("Incorreta:"):
            return f'{indent}<div class="code-status-label status-incorrect"><span class="badge-status bad">❌ Incorreta</span> Descrição vaga ou ausência de contexto:</div>'
        elif text.startswith("<strong>Correta:</strong>") or text.startswith("Correta:"):
            return f'{indent}<div class="code-status-label status-correct"><span class="badge-status good">✅ Correta</span> Descritiva, contextual e informativa:</div>'
        return f'{indent}<p>{text}</p>'
        
    elif b_type == "art_card":
        num_str = f"{block['num']:02d}" if block['num'] < 10 else f"{block['num']}"
        title = block["title"]
        desc = block["desc"]
        elem = block["elements"]
        pal = block["palette"]
        guide = block["guidelines"]
        art_id = block["id"]
        
        specs_html = []
        if elem:
            specs_html.append(f'{indent}    <div class="art-spec-pill"><span class="spec-label">Elementos Visuais:</span> {elem}</div>')
        if pal:
            specs_html.append(f'{indent}    <div class="art-spec-pill"><span class="spec-label">Paleta Sugerida:</span> {pal}</div>')
        if guide:
            specs_html.append(f'{indent}    <div class="art-spec-pill"><span class="spec-label">Diretriz de Acessibilidade:</span> {guide}</div>')
        specs_str = "\n".join(specs_html)
        
        return (f'{indent}<figure class="art-placeholder-card" id="{art_id}" aria-label="Espaço para ilustração: {title}">\n'
                f'{indent}  <div class="art-card-header">\n'
                f'{indent}    <div class="art-badge">\n'
                f'{indent}      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>\n'
                f'{indent}      <span>Espaço para Ilustração • Arte {num_str}</span>\n'
                f'{indent}    </div>\n'
                f'{indent}    <span class="art-status-badge">Produção Manual</span>\n'
                f'{indent}  </div>\n'
                f'{indent}  <div class="art-card-content">\n'
                f'{indent}    <h4 class="art-card-title">{title}</h4>\n'
                f'{indent}    <div class="art-card-desc">\n'
                f'{indent}      <p><strong>Descrição da Arte:</strong> {desc}</p>\n'
                f'{indent}    </div>\n'
                f'{indent}    <div class="art-card-specs">\n'
                f'{specs_str}\n'
                f'{indent}    </div>\n'
                f'{indent}  </div>\n'
                f'{indent}</figure>')

    elif b_type == "code":
        lang = block.get("lang", "html").upper()
        code_raw = block.get("code", "")
        code_escaped = (code_raw
                        .replace("&", "&amp;")
                        .replace("<", "&lt;")
                        .replace(">", "&gt;"))
        return (f'{indent}<div class="code-card" role="region" aria-label="Exemplo de código {lang}">\n'
                f'{indent}  <div class="code-header">\n'
                f'{indent}    <span>Exemplo de Código ({lang})</span>\n'
                f'{indent}    <button type="button" class="code-copy-btn" onclick="navigator.clipboard.writeText(this.closest(\'.code-card\').querySelector(\'code\').innerText).then(()=>{{this.innerText=\'Copiado!\';setTimeout(()=>this.innerText=\'Copiar\',2000)}})" aria-label="Copiar código HTML">Copiar</button>\n'
                f'{indent}  </div>\n'
                f'{indent}  <pre><code class="language-{lang.lower()}">{code_escaped}</code></pre>\n'
                f'{indent}</div>')
        
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
    if "auditivo" in t or "libras" in t or "som" in t or "vídeo" in t or "video" in t: return "category-auditivo"
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
        elif b["type"] == "art_card":
            text = re.sub(r'<[^>]+>', ' ', (b["title"] + " " + b["desc"]).lower())
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
        elif b["type"] == "art_card":
            clean = f"Arte {b['num']}: {b['title']} - {b['desc']}"
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
    if len(sys.argv) > 1:
        md_file = Path(sys.argv[1])
    else:
        md_file = DEFAULT_MD_PATH
        if not md_file.exists():
            for alt_name in [
                "Guia de Boas Práticas de Acessibilidade Digital.md",
                "Guia de Boas Práticas de Acessibilidade Digital .md",
            ]:
                alt_p = PROJECT_ROOT / alt_name
                if alt_p.exists():
                    md_file = alt_p
                    break
    
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
