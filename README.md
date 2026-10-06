# 🏛️ Guia de Boas Práticas de Acessibilidade Digital
### Prefeitura da Cidade do Rio de Janeiro · Subsecretaria de Transformação Digital

[![Acessibilidade WCAG 2.2](https://img.shields.io/badge/WCAG-2.2%20AA%20%2F%20AAA-blue.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![LBI Compliant](https://img.shields.io/badge/Legisla%C3%A7%C3%A3o-LBI%2013.146%2F2015-green.svg)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)
[![VLibras Integrado](https://img.shields.io/badge/VLibras-Dispon%C3%ADvel-00C0F3.svg)](https://www.vlibras.gov.br/)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg)](LICENSE)

Portal interativo e manual completo de diretrizes de acessibilidade para produtos digitais, sites, portais e serviços públicos da Prefeitura do Rio.

---

## 🎯 Objetivo

Garantir que os serviços e plataformas públicas digitais do município do Rio de Janeiro sejam universalmente acessíveis a todas as pessoas, incluindo cidadãos com deficiências visuais, auditivas, motoras, cognitivas e com baixa literacia digital, cumprindo rigorosamente a **Lei Brasileira de Inclusão (Lei Federal nº 13.146/2015)** e os critérios de conformidade da **WCAG 2.2 (Web Content Accessibility Guidelines)**.

---

## ✨ Recursos do Portal

- 🔍 **Mecanismo de Busca Preditiva ao Vivo:**
  - Sugestões instantâneas conforme o usuário digita.
  - Realce visual dos termos correspondentes.
  - Navegação fluida via teclado (`↑`, `↓`, `Enter`, `Esc`) e atalho universal (`/` ou `Ctrl + K`).
  - Tags categorizadas por tipo de barreira e conteúdo (Textual, Visual, Auditivo, Cognitivo, Normas, Censo).
- 🎛️ **Barra de Ferramentas de Acessibilidade (Sticky):**
  - **Modo Alto Contraste:** Fundo preto absoluto (`#000000`) com destaques em amarelo (`#FFFF00`) e ciano elétrico (`#00FFFF`), superando os requisitos WCAG AAA.
  - **Modo Escuro (Dark Mode):** Paleta noturna suave com alto contraste de texto e elementos de interface.
  - **Fonte para Dislexia:** Tipografia especializada com base pesada para facilitar a leitura.
  - **Espaçamento Expandido:** Aplicação de espaçamento dinâmico de linhas, palavras e parágrafos conforme o Critério WCAG 1.4.12.
  - **Sublinhar Links:** Identificação visual imediata de todos os hiperlinks do texto.
  - **Redimensionamento de Fonte:** Controles de ampliação (`A+` / `A-`) com escala relativa baseada em `rem`.
- 🤟 **Integração com VLibras:**
  - Widget nativo de tradução automática para a Língua Brasileira de Sinais.
- 📑 **Sumário Lateral Interativo com Scrollspy:**
  - Destaque em tempo real da seção em leitura e barra de progresso no topo da página.
- 💡 **Exemplos Comparativos "Como Fazer" vs "Como Evitar":**
  - Blocos didáticos de boas práticas de design, redação e código para designers, desenvolvedores e redatores.
- 📊 **Tabelas e Cards Semânticos:**
  - Níveis de dificuldade de implementação técnica, esforço estimado e impacto para o usuário final.

---

## 📁 Estrutura do Projeto

```text
├── index.html                   # Redirecionamento amigável para o portal
├── GuiaAcessibilidade.md        # Documento-base com as diretrizes completas
├── README.md                    # Esta documentação
└── guiasite/                    # Portal Web Standalone
    ├── index.html               # Estrutura HTML5 semântica completa
    ├── css/
    │   └── style.css            # Folha de estilos responsiva, temas e acessibilidade
    ├── js/
    │   └── app.js               # Busca preditiva, atalhos, scrollspy e controles
    └── assets/
        └── images/              # Imagens e infográficos de apoio extraídos do guia
```

---

## 🚀 Como Executar Localmente

Não requer instalação de Node.js, banco de dados ou dependências externas!

1. Clone o repositório:
   ```bash
   git clone https://github.com/MrSherlockyX/guia-acessibilidade-rio.git
   ```
2. Abra o arquivo `index.html` ou `guiasite/index.html` diretamente em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).

---

## 🔄 Como Atualizar os Textos (Google Docs » Portal)

O portal conta com um pipeline automatizado para que novas versões do guia exportadas do Google Docs atualizem automaticamente o site, o sumário e o mecanismo de busca:

### Opção 1: Atalho de 1 Clique no Windows (`atualizar_guia.bat`)
1. No Google Docs, clique em **Arquivo** > **Fazer download** > **Markdown (.md)**.
2. Salve o arquivo como `GuiaAcessibilidade.md` na raiz do projeto.
3. Dê dois cliques em `atualizar_guia.bat`.
4. O script extrairá novas imagens, atualizará os capítulos, reconstruirá o sumário lateral e o banco de busca, perguntando se deseja enviar para o GitHub automaticamente.

### Opção 2: Conversor Web no Próprio Navegador (`conversor.html`)
- Acesse `guiasite/conversor.html` (ou online em [https://mrsherlockyx.github.io/guia-acessibilidade-rio/guiasite/conversor.html](https://mrsherlockyx.github.io/guia-acessibilidade-rio/guiasite/conversor.html)).
- Arraste o arquivo `.md` do Google Docs para a tela para obter a prévia da nova estrutura, estatísticas e arquivos gerados em tempo real sem precisar de terminal.

### Opção 3: Automação Total via GitHub Actions
- Ao fazer upload ou commit de um novo `GuiaAcessibilidade.md` no repositório GitHub, a action `.github/workflows/rebuild.yml` reconstrói e publica o site automaticamente no GitHub Pages!

---

## 🌐 Publicação no GitHub Pages

O portal está estruturado para publicação imediata no GitHub Pages:
- **Configuração:** `Settings` > `Pages` > Branch: `main` > Pasta: `/ (root)`.
- **URL pública:** [https://mrsherlockyx.github.io/guia-acessibilidade-rio/](https://mrsherlockyx.github.io/guia-acessibilidade-rio/)

---

## 📄 Legislação e Referências

- [WCAG 2.2 — W3C Web Accessibility Guidelines](https://www.w3.org/TR/WCAG22/)
- [Lei Brasileira de Inclusão da Pessoa com Deficiência (LBI — Lei nº 13.146/2015)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)
- [eMAG — Modelo de Acessibilidade em Governo Eletrônico](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/emag)

---

*Desenvolvido em conformidade com as diretrizes de Governo Digital e Transformação Digital da Prefeitura da Cidade do Rio de Janeiro.*
