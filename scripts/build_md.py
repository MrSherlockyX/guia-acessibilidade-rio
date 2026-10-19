import re
import sys
import io
from pathlib import Path

# Garante saída UTF-8 no Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

PROJECT_ROOT = Path(__file__).resolve().parent.parent

def find_source_file():
    if len(sys.argv) > 1:
        p = Path(sys.argv[1])
        if p.exists():
            return p
            
    # Busca por qualquer export do Docs (ex: Guia de Boas Práticas de Acessibilidade Digital (2).md)
    files = [f for f in PROJECT_ROOT.glob("Guia de Boas Práticas*.md") if f.is_file()]
    if files:
        files.sort(key=lambda f: f.stat().st_mtime, reverse=True)
        return files[0]
        
    candidates = [
        PROJECT_ROOT / "GuiaAcessibilidade.md"
    ]
    for c in candidates:
        if c.exists():
            return c
    return None

def make_art_block(num, title, desc, elem, pal, guide):
    num_str = f"{num:02d}" if num < 10 else f"{num}"
    return (
        f"> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE {num_str}]**  \n"
        f"> **Título:** {title}  \n"
        f"> **Descrição da Arte:** {desc}  \n"
        f"> **Elementos Visuais:** {elem}  \n"
        f"> **Paleta Sugerida:** {pal}  \n"
        f"> **Diretriz de Acessibilidade:** {guide}\n"
    )

ART_BLOCKS = {
    1: make_art_block(
        1,
        "Censo IBGE 2010 — População Geral com Deficiência",
        "Infográfico com destaque estatístico para os 23,9% da população brasileira (45.606.048 pessoas de um total de 190.755.799 habitantes) que declararam possuir pelo menos uma deficiência em algum grau no Censo 2010. Detalhamento por tipos: Visual (18,6%), Motora (7,0%), Auditiva (5,1%) e Mental/Intelectual (1,4%).",
        "Gráfico de barras estilizadas com pictogramas acessíveis para cada tipo de deficiência (olho, cadeira de rodas, ouvido, cérebro/mente). Tipografia destacada para '23,9%'.",
        "Azul institucional Prefeitura do Rio (#002B49 e #004A80), ciano (#00C0F3) e neutros de alto contraste.",
        "Garantir contraste de texto mínimo de 4.5:1 sobre o fundo. Não diferenciar os tipos de deficiência apenas pela cor das barras."
    ),
    2: make_art_block(
        2,
        "Censo IBGE 2010 — Comparação: Deficiência Geral (23,9%) vs. Severa (8,3%)",
        "Infográfico comparativo demonstrando o recorte entre a população geral com alguma deficiência (23,9%) e aquelas com deficiência severa (8,3%, representando pessoas com muita dificuldade ou incapacidade total). Apresenta a maior prevalência entre mulheres e o recorte regional: Estado do RJ (24,4%) e Cidade do Rio de Janeiro (24,7%, quase 1/4 da população carioca).",
        "Diagrama comparativo com dois blocos ou funil infográfico. Ícone sutil da Cidade do Rio de Janeiro contextualizando os 24,7%.",
        "Azul escuro (#001F33), azul intermediário (#1565C0) e destaque em amarelo ouro ou ciano.",
        "Textos explicativos nítidos acompanhando os números percentuais."
    ),
    3: make_art_block(
        3,
        "Censo IBGE 2022 — Nova Classificação e Metodologia Washington Group",
        "Quadro explicativo sobre a mudança de metodologia do Censo 2022: incorporação de novas perguntas e critérios mais restritivos do Washington Group. Passou a contabilizar exclusivamente casos graves e permanentes (excluindo temporários e moderados), além da divisão entre questionário básico e estendido.",
        "Matriz com os tipos avaliados (locomoção, visão, audição, cognição e autocuidado) e caixa de aviso sobre o critério de gravidade permanente.",
        "Fundo neutro claro, bordas estruturadas em azul ardósia (#9DBDCE) e ícones semânticos.",
        "Tipografia legível sem serifa; ícones com rótulos de texto explícitos."
    ),
    4: make_art_block(
        4,
        "Comparativo Censo 2010 vs. 2022 — A Queda Estatística e a Subnotificação no Rio",
        "Gráfico de impacto mostrando a discrepância estatística decorrente da mudança de metodologia: queda do percentual de pessoas com deficiência na Cidade do Rio de Janeiro de 24,7% (2010) para 6,9% (2022), e cerca de 30 milhões a menos no Brasil. Alerta para o risco de subnotificação em políticas públicas frente ao envelhecimento populacional.",
        "Duas colunas comparativas para a Cidade do Rio: Barra 2010 (24,7%) vs Barra 2022 (6,9%), com anotação de 'Subnotificação Estatística' e dados da PNAD 2022 sobre salto de deficiências a partir dos 40 e 60 anos.",
        "Azul marinho (#002B49) para 2010, cinza/azul suave para 2022 e linha de alerta âmbar (#92400E).",
        "Incluir nota explicativa clara de que a queda reflete mudança de cálculo e não redução real da população que necessita de acessibilidade."
    ),
    5: make_art_block(
        5,
        "As 7 Dimensões da Acessibilidade (Romeu Kazumi Sassaki)",
        "Diagrama conceitual integrando as sete dimensões de acessibilidade: 1. Arquitetônica (espaços físicos); 2. Comunicacional (linguagem simples, legendas, LIBRAS); 3. Metodológica (processos e métodos); 4. Instrumental (softwares e dispositivos); 5. Programática (leis e políticas); 6. Atitudinal (eliminação de preconceitos); 7. Digital/Tecnológica (serviços web e sistemas).",
        "Diagrama radial/circular com o cidadão ao centro e as 7 dimensões interligadas com ícones modernos.",
        "Tons harmoniosos da identidade visual do Rio: azul primário, ciano, verde esmeralda e ardósia.",
        "Cada dimensão deve conter ícone vetorial e um pequeno subtítulo explicativo com alto contraste."
    ),
    6: make_art_block(
        6,
        "Pesquisa BID 2025 — Autoconfiança no Uso de Serviços Públicos Digitais",
        "Gráfico baseado na pesquisa do Banco Interamericano de Desenvolvimento (BID, 2025): demonstra que mesmo com 94,2% de celulares conectados, a média de autoconfiança digital é de apenas 47,5%. A confiança cai para 24,2% entre pessoas com deficiência, 24,0% em idosos (+55 anos) e 26,7% em baixa escolaridade. 57,2% prefeririam atendimento presencial por insegurança no digital.",
        "Gráfico de barras horizontais contrastando a média geral (47,5%) com as populações mais vulneráveis (24%), com destaque para a frase-chave sobre autonomia.",
        "Azul cobalto (#004A80), vermelho/coral de alerta para barreiras e verde para autonomia.",
        "Indicar percentuais numéricos de forma clara e visível dentro ou ao lado de cada barra."
    ),
    7: make_art_block(
        7,
        "Simulação Visual de Daltonismo — Espectro de Cores",
        "Infográfico demonstrativo do espectro de cores visível para pessoas com diferentes tipos de daltonismo: Visão Tricromata (Normal), Protanopia (ausência de cones vermelhos), Deuteranopia (ausência de cones verdes), Tritanopia (dificuldade com azul/amarelo) e Acromatopsia (monocromática / escala de cinza).",
        "Barras horizontais paralelas exibindo o arco-íris comparado em cada uma das condições.",
        "Espectros simulados de Protanopia, Deuteranopia e Tritanopia com legendas descritivas.",
        "Apresentar rótulos textuais nítidos para cada espectro, permitindo que a diferença seja compreendida mesmo sem visualização colorida."
    ),
    8: make_art_block(
        8,
        "Boas Práticas de Interface para Daltonismo: Não Dependa Apenas da Cor",
        "Exemplo prático de componente de interface (formulário / status / gráfico) mostrando a abordagem incorreta (diferenciação baseada somente em cor verde/vermelho) versus a abordagem acessível (reforço simultâneo com ícones ✓ e ✕, texto descritivo e textura de traço).",
        "Layout 'Antes vs Depois' ou 'Evite vs Prefira' com cards lado a lado.",
        "Cores de interface com contornos definidos e ícones pretos/brancos de suporte.",
        "Excelente exemplo didático para designers e desenvolvedores front-end."
    ),
    9: make_art_block(
        9,
        "Contraste Textual Mínimo — Diretrizes WCAG AA (4.5:1 e 3:1)",
        "Demonstração visual das relações mínimas de contraste exigidas pela WCAG 2.2 Nível AA: 4.5:1 para texto normal e 3:1 para texto grande (18pt ou 14pt negrito). Comparativo com contraste insuficiente (reprovado) e contraste ampliado AAA (7:1).",
        "Cards de amostra tipográfica com indicador de medição de contraste e carimbo de 'Aprovado AA' ou 'Reprovado'.",
        "Exemplos com fundo branco (#FFFFFF) e fundos escuros (#0F172A), demonstrando ambos os modos.",
        "Indicar o valor numérico exato do cálculo de luminância em cada amostra."
    ),
    10: make_art_block(
        10,
        "Comunicação Multissensorial — Informação Além da Cor",
        "Exemplo de como transmitir mensagens essenciais, alertas de sistema e gráficos utilizando cor combinada com tipografia, ícones e formas geométricas, cumprindo a diretriz WCAG 1.4.1.",
        "Trio de status (Sucesso, Atenção, Erro) exibindo simultaneamente: cor + ícone semântico + rótulo textual.",
        "Verde esmeralda, amarelo âmbar e vermelho carmim sobre superfícies adequadas.",
        "Demonstrar que o usuário com qualquer alteração visual consegue entender a ação imediatamente."
    ),
    11: make_art_block(
        11,
        "Anatomia de um Campo de Formulário Acessível",
        "Diagrama anotado de um campo de entrada (input): rótulo visível <label> permanentemente associado pelo atributo 'for', texto de ajuda instrutivo, marcação de campo obrigatório e mensagem de validação de erro contextual com sugestão de correção.",
        "Mockup explodido de input com setas numeradas apontando para cada requisito de acessibilidade.",
        "Design de formulário moderno, limpo, alinhado ao padrão Governo Digital.",
        "Evitar uso exclusivo de placeholder como único rótulo."
    ),
    12: make_art_block(
        12,
        "O Atributo 'alt' no Leitor de Tela — Imagens Informativas",
        "Ilustração do funcionamento da tecnologia assistiva: uma imagem de um atendimento ao público da Prefeitura do Rio sendo interpretada por um leitor de tela (NVDA/TalkBack), que sintetiza a fala com base no atributo alt descritivo.",
        "Foto/desenho com balão de fala sonoro contendo a descrição textual acessível.",
        "Cores quentes e acolhedoras para o atendimento humano, tons de azul para o sintetizador.",
        "Ressaltar a concisão (100 a 150 caracteres) e a riqueza contextual da descrição."
    ),
    13: make_art_block(
        13,
        "Texto Real em HTML/CSS vs. Texto Embutido em Imagem Rasterizada",
        "Comparativo ilustrado: Banner promocional com texto 'achatado' dentro do arquivo de imagem (perda de qualidade ao ampliar, invisível para leitores de tela) versus Banner com imagem de fundo estilizada e texto real renderizado via HTML e CSS.",
        "Simulação de zoom 200%: lado esquerdo borrado/pixelado; lado direito 100% nítido, selecionável e responsivo.",
        "Contraste forte entre a imagem e as caixas de texto.",
        "Destacar a preservação de nitidez em telas de alta densidade (Retina/OLED)."
    ),
    14: make_art_block(
        14,
        "Estrutura Semântica de Tabelas de Dados",
        "Diagrama de uma tabela acessível evidenciando a marcação de <caption> (título resumido da tabela), cabeçalhos de coluna <th> com scope='col', cabeçalhos de linha com scope='row' e células de dados <td>.",
        "Tabela tridimensional ou explodida com linhas de conexão demonstrando como o leitor de tela relaciona cada célula ao seu cabeçalho correspondente.",
        "Cabeçalhos em azul escuro (#002B49) e linhas zebradas suaves.",
        "Mostrar a lógica de leitura horizontal e vertical para leitores de tela."
    ),
    15: make_art_block(
        15,
        "Anatomia de Legendas Acessíveis e Sincronizadas (Closed Captions / WebVTT)",
        "Demonstração visual de um player de vídeo acessível reproduzindo áudio perfeitamente sincronizado com legendas no padrão WebVTT. Evidencia as boas práticas: identificação explícita de quem fala entre colchetes (ex: '[Palestrante]'), descrição de informações sonoras contextuais não verbais (ex: '[música suave de fundo]', '[aplausos]'), quebra em até 2 linhas e fundo escuro semitransparente que garante legibilidade sobre cenas claras ou escuras. Alerta contra a dependência cega de legendas automáticas sem revisão humana.",
        "Mockup de player de vídeo com botões de controle, botão 'CC' ativado, caixa de legenda destacada e três balões explicativos apontando para: 1. Identificação do locutor; 2. Efeitos sonoros; 3. Contraste da caixa de texto.",
        "Interface do player em azul escuro (#0F172A), caixa de legenda preta (#000000) com texto branco (#FFFFFF) ou amarelo (#FFEB3B) e acentos em ciano (#00C0F3).",
        "Critério WCAG 1.2.2 (Legendas Pré-gravadas - Nível A). Nunca disponibilizar legendas geradas automaticamente sem revisão humana prévia."
    ),
    16: make_art_block(
        16,
        "Enquadramento e Boas Práticas da Janela de LIBRAS em Vídeo",
        "Guia visual completo de produção para a janela de tradução em Língua Brasileira de Sinais (LIBRAS). Demonstração da área correta de enquadramento da câmera (da linha abaixo da cintura até acima da cabeça, com folga lateral abrangendo ambos os cotovelos para visualização ampla dos sinais e do espaço de sinalização), vestimenta e parede de fundo em tons sólidos contrastantes com a cor de pele do intérprete, e posicionamento no canto inferior direito do vídeo dimensionado para permitir visualização nítida de expressões faciais sem cobrir letreiros ou legendas.",
        "Ilustração de intérprete de LIBRAS com linhas guias de enquadramento (limites seguros: cabeça, cotovelos e cintura), iluminação frontal suave e inserção na tela principal de vídeo com indicação de área de segurança.",
        "Fundo de estúdio em azul marinho sóbrio (#002B49) ou cinza neutro, contraste luminoso com a pele e janela delimitada com traço sutil.",
        "Critério WCAG 1.2.6 (Língua de Sinais Pré-gravada - Nível AAA). Lembrete de que plugins automatizados (avatares 3D) não substituem a tradução humana nativa."
    ),
    17: make_art_block(
        17,
        "Árvore de Hierarquia Semântica de Cabeçalhos (H1 a H4)",
        "Diagrama em árvore mostrando a correta ordenação dos títulos em um portal: H1 (único, tema principal) -> H2 (capítulos/seções) -> H3 (subtópicos) -> H4 (detalhes). Alerta visual contra a prática incorreta de pular níveis (ex: H1 direto para H3).",
        "Organograma hierárquico com nós conectados e ícones de marcação semântica.",
        "Gradiente estruturado de azuis da Prefeitura do Rio, do mais escuro (H1) ao mais claro (H4).",
        "Excelente guia rápido de arquitetura da informação para criadores de conteúdo."
    ),
    18: make_art_block(
        18,
        "Regiões Semânticas e Pontos de Referência (Landmarks HTML5)",
        "Wireframe de uma página web destacando as principais regiões semânticas: <header> (topo/banner), <nav> (navegação/menus), <main> (conteúdo principal único), <aside> (complementar/lateral) e <footer> (rodapé institucional).",
        "Esquema visual de página web com blocos codificados por cor e etiquetas de código semântico.",
        "Paleta de layout suave com contornos pontilhados em azul e ciano.",
        "Facilita o entendimento de como pessoas cegas saltam rapidamente entre seções da página."
    ),
    19: make_art_block(
        19,
        "Indicador de Foco Visível para Navegação por Teclado",
        "Demonstração de acessibilidade motora e visual: elemento interativo (botão ou link) recebendo foco pelo teclado (tecla Tab) com anel de destaque (:focus-visible) duplo e de alto contraste. Comparação com o erro comum de remover o contorno com 'outline: none'.",
        "Simulação de botão em 3 estados: Normal, Hover (mouse) e Foco Ativo pelo Teclado com anel iluminado de 3px.",
        "Botão em azul royal com anel de foco em ciano vívido (#00C0F3) e offset branco.",
        "Requisito indispensável para usuários que utilizam teclado, switches ou comando de voz."
    ),
    20: make_art_block(
        20,
        "Reflow Responsivo — Adaptação Fluida a 320px sem Rolagem Horizontal",
        "Ilustração do critério WCAG 1.4.10 (Reflow): o mesmo portal exibido em tela de Desktop (1280px) com múltiplas colunas e adaptado fluidamente para tela mobile estreita (320px de largura) ou zoom de 400%, sem perda de conteúdo e sem necessidade de barra de rolagem horizontal.",
        "Dois dispositivos lado a lado (Monitor vs Smartphone compacto) mostrando o rearranjo vertical natural dos blocos de conteúdo.",
        "Fundos claros com blocos de texto e botões redimensionados com área de toque mínima de 44x44px.",
        "Destacar a importância do design mobile-first e da tipografia responsiva com unidades relativas."
    )
}

def build_markdown():
    src_file = find_source_file()
    if not src_file:
        print("❌ Nenhum arquivo markdown fonte encontrado!")
        sys.exit(1)

    print(f"📄 Lendo arquivo fonte: {src_file.name}")
    content = src_file.read_text(encoding='utf-8', errors='replace')

    # Remove definições base64
    content = re.sub(r'^\[image\d+\]:\s*<.*?>\r?\n?', '', content, flags=re.MULTILINE)

    # Remove artes pré-existentes caso o arquivo já tenha algumas
    content = re.sub(r'>\s*\*\*\[(?:ESPAÇO PARA ILUSTRAÇÃO|Arte|ARTE).*?(?=\n\n|\n[^\>]|\Z)', '', content, flags=re.DOTALL)

    # Substitui marcações de imagens originais 1 a 8
    content = content.replace("![][image1]", "\n" + ART_BLOCKS[1] + "\n")
    content = content.replace("![][image2]", "\n" + ART_BLOCKS[2] + "\n")
    content = content.replace("![][image3]", "\n" + ART_BLOCKS[3] + "\n")
    content = re.sub(r'\*{0,2}!\[\]\[image4\]\*{0,2}', "\n" + ART_BLOCKS[4] + "\n", content)
    content = re.sub(r'###\s*\*{0,2}!\[\]\[image5\]\*{0,2}', "\n" + ART_BLOCKS[5] + "\n", content)
    content = content.replace("![][image6]", "\n" + ART_BLOCKS[6] + "\n")
    content = re.sub(r'\*{0,2}!\[\]\[image7\]!\[\]\[image8\]\*{0,2}', "\n" + ART_BLOCKS[7] + "\n\n" + ART_BLOCKS[8] + "\n", content)

    # Inserção das Artes 09 a 20 nos respectivos tópicos
    insertions = [
        ("6. [**Contraste textual:**]", "7. [**Contraste não textual:", 9),
        ("8. [**Uso de cores:**]", "9. [**Indicação de link:", 10),
        ("10. [**Formulários:**]", "11. [**Listas:", 11),
        ("1. [**Imagens informativas:**]", "2. [**Imagens decorativas:", 12),
        ("4. [**Imagens com texto:**]", "5. [**Imagens complexas:", 13),
        ("8. [**Tabelas:**]", "### Apresentação do conteúdo em vídeo:", 14),
        ("1. [**Uso de legendas**:]", "2. [**Uso de audiodescrição**]", 15),
        ("4. [**Língua de sinais:**]", "### Estrutura da página", 16),
        ("1. [**Cabeçalhos:**]", "2. [**Rodapé:**]", 17),
        ("4. [**Conteúdo complementar:**]", "### Navegabilidade da interface", 18),
        ("1. [**Navegação por teclado**]", "2. [**Tempo de navegação ajustável:", 19),
        ("3. [**Design para diferentes tamanhos de viewport:**]", "\n[^1]:", 20)
    ]

    for start_anchor, end_anchor, art_num in insertions:
        start_idx = content.find(start_anchor)
        if start_idx != -1:
            end_idx = content.find(end_anchor, start_idx) if end_anchor else -1
            if end_idx != -1:
                content = content[:end_idx] + "\n" + ART_BLOCKS[art_num] + "\n\n" + content[end_idx:]
            else:
                content += "\n\n" + ART_BLOCKS[art_num] + "\n"

    # Limpeza de espaçamentos múltiplos
    content = re.sub(r'\n{3,}', '\n\n', content)

    out_file = PROJECT_ROOT / "GuiaAcessibilidade.md"
    out_file.write_text(content, encoding='utf-8')
    print(f"✅ GuiaAcessibilidade.md gerado com sucesso! ({len(content)} caracteres)")

if __name__ == "__main__":
    build_markdown()
