/**
 * GUIA DE BOAS PRÁTICAS DE ACESSIBILIDADE DIGITAL - PREFEITURA DO RIO
 * Motor de busca em tempo real com sugestões dinâmicas (Autocomplete),
 * ScrollSpy hierárquico, Toolbar de Acessibilidade e Lightbox acessível.
 */

document.addEventListener("DOMContentLoaded", () => {
  initSearchAutocomplete();
  initAccessibilityToolbar();
  initTableOfContents();
  initImageModal();
  initCodeCopyButtons();
  initBackToTop();
  initReadingProgress();
});

/* ==========================================================================
   1. MOTOR DE PESQUISA COM SUGESTÕES EM TEMPO REAL (AUTOCOMPLETE)
   ========================================================================== */

// Base de dados indexada para o autocomplete em tempo real
const searchDatabase = [
  // Introdução & Conceitos
  {
    id: "introducao",
    title: "Introdução: Inclusão e Transformação Digital",
    category: "Geral",
    categoryClass: "category-normas",
    keywords: "prefeitura rio cidadania inclusão digital transformação carioca governo serviços públicos",
    snippet: "Compromisso da gestão pública municipal com a inclusão digital de todos os cidadãos cariocas."
  },
  {
    id: "definicao-pcd",
    title: "Definição de Pessoas com Deficiência (Ministério da Saúde)",
    category: "Conceitos",
    categoryClass: "category-censo",
    keywords: "pcd conceito impedimento barreiras atitudinais físicas sensoriais ambientais",
    snippet: "Impedimento de médio ou longo prazo de natureza física, mental, intelectual ou sensorial que interage com barreiras."
  },
  {
    id: "tipos-deficiencia",
    title: "Tipos de Deficiência: Congênita, Adquirida e Ocultas",
    category: "Conceitos",
    categoryClass: "category-censo",
    keywords: "congênita adquirida invisíveis ocultas temporária permanente fibromialgia tea tdah lúpus",
    snippet: "Classificação quanto à origem (congênita/adquirida), duração (temporária/permanente) e deficiências invisíveis."
  },
  {
    id: "censo-demografia",
    title: "Estatísticas: Censo 2010 vs 2022 e o Cenário Carioca",
    category: "Estatísticas",
    categoryClass: "category-censo",
    keywords: "censo ibge 2010 2022 dados estatística rio de janeiro subnotificação envelhecimento idosos",
    snippet: "Comparativo dos censos, queda de 24,7% para 6,9% por mudança metodológica e o envelhecimento populacional no Rio."
  },
  {
    id: "direitos-pcd",
    title: "Direitos das PCDs: Convenção da ONU e Lei nº 13.146 (LBI)",
    category: "Legislação",
    categoryClass: "category-normas",
    keywords: "lei 13146 lbi estatuto pessoa com deficiência onu convenção direitos constitucionais",
    snippet: "Estatuto da Pessoa com Deficiência (LBI) e a Convenção da ONU com status de Emenda Constitucional no Brasil."
  },
  {
    id: "dimensoes-acessibilidade",
    title: "As 7 Dimensões da Acessibilidade (Romeu Sassaki) e Desenho Universal",
    category: "Conceitos",
    categoryClass: "category-normas",
    keywords: "sassaki 7 dimensões arquitetônica comunicacional metodológica instrumental programática atitudinal digital desenho universal",
    snippet: "Arquitetônica, comunicacional, metodológica, instrumental, programática, atitudinal e digital, além do Desenho Universal."
  },
  {
    id: "acessibilidade-digital-conceito",
    title: "Acessibilidade Digital: Obrigatoriedade Legal e Cenário",
    category: "Conceitos",
    categoryClass: "category-normas",
    keywords: "acessibilidade digital artigo 63 lbi lei obrigatória web internet barreiras sistemas legados",
    snippet: "Eliminação de barreiras na Web para que todas as pessoas possam perceber, entender, navegar e interagir."
  },
  {
    id: "pesquisas-bid-wpt",
    title: "Pesquisa BID 2025 e Movimento Web Para Todos 2024",
    category: "Estatísticas",
    categoryClass: "category-censo",
    keywords: "bid 2025 wpt web para todos bigdatacorp estatísticas falhas 89% sites governamentais 2,9%",
    snippet: "Pesquisa aponta baixa adaptação digital (BID) e que 89,96% dos sites governamentais falham em acessibilidade (WPT)."
  },

  // Tipos de Deficiência & Tecnologias Assistivas
  {
    id: "deficiencia-visual-cegueira",
    title: "Deficiência Visual: Cegueira e Leitores de Tela",
    category: "Visual",
    categoryClass: "category-visual",
    keywords: "cegueira leitor de tela nvda jaws voiceover texto alternativo alt semântica teclado",
    snippet: "Dificuldades com imagens sem descrição, formulários sem identificação e boas práticas com HTML semântico e teclado."
  },
  {
    id: "deficiencia-visual-baixa-visao",
    title: "Deficiência Visual: Baixa Visão e Ampliação",
    category: "Visual",
    categoryClass: "category-visual",
    keywords: "baixa visão zoom 200% contraste fontes pequenas ampliação layout responsivo",
    snippet: "Importância do contraste adequado, texto redimensionável até 200% sem perda de conteúdo e espaçamentos."
  },
  {
    id: "deficiencia-visual-daltonismo",
    title: "Daltonismo: Protanopia, Deuteranopia e Tritanopia",
    category: "Visual",
    categoryClass: "category-visual",
    keywords: "daltonismo protanopia deuteranopia tritanopia cores contraste uso de cores monocromático gráficos",
    snippet: "A cor nunca deve ser o único meio de transmitir informação; combinar cores com textos, ícones e padrões visuais."
  },
  {
    id: "deficiencia-auditiva-surdez",
    title: "Deficiência Auditiva: Surdez e Conteúdos em LIBRAS",
    category: "Auditivo",
    categoryClass: "category-auditivo",
    keywords: "surdez auditiva legendas libras webvtt intérprete língua de sinais transcrição áudio",
    snippet: "Uso de legendas sincronizadas (WebVTT), transcrições para áudios e tradução em LIBRAS sem depender exclusivamente de sons."
  },
  {
    id: "deficiencia-intelectual",
    title: "Deficiência Intelectual e Cognitiva: Linguagem Simples",
    category: "Cognitivo",
    categoryClass: "category-cognitivo",
    keywords: "intelectual cognitiva linguagem simples instruções claras etapas menores consistência",
    snippet: "Uso de linguagem simples, divisão de tarefas complexas em etapas menores e mensagens de erro elucidativas."
  },
  {
    id: "deficiencia-cognitiva-tea",
    title: "Transtorno do Espectro Autista (TEA): Previsibilidade",
    category: "Cognitivo",
    categoryClass: "category-cognitivo",
    keywords: "tea autismo espectro autista estímulos visuais som reprodução automática consistência previsibilidade",
    snippet: "Evitar animações desnecessárias, não reproduzir áudio/vídeo automaticamente e manter layouts previsíveis."
  },
  {
    id: "deficiencia-cognitiva-tdah",
    title: "TDAH: Foco, Hierarquia e Tempo Suficiente",
    category: "Cognitivo",
    categoryClass: "category-cognitivo",
    keywords: "tdah déficit de atenção hiperatividade poluição visual hierarquia tempo memorização",
    snippet: "Interfaces limpas sem distrações visuais, redução da carga de memorização e tempo ajustável para tarefas."
  },
  {
    id: "deficiencia-cognitiva-dislexia",
    title: "Dislexia: Legibilidade de Fontes e Alternativas Textuais",
    category: "Cognitivo",
    categoryClass: "category-cognitivo",
    keywords: "dislexia fontes sem serifa opendyslexic espaçamento áudio leitura em voz alta",
    snippet: "Fontes simples sem serifa ou específicas, espaçamento generoso e opções de áudio/leitura em voz alta."
  },

  // Padrões Normativos
  {
    id: "mobile-first",
    title: "Abordagem Mobile-First e Design Responsivo",
    category: "Normas",
    categoryClass: "category-normas",
    keywords: "mobile first responsivo celular telas pequenas luke wroblewski aprimoramento progressivo",
    snippet: "Projetar primeiro para dispositivos móveis garantindo que serviços públicos funcionem em qualquer tela."
  },
  {
    id: "wcag-emag-abnt",
    title: "Padrões Normativos: WCAG 2.2, eMAG 3.1 e Normas ABNT",
    category: "Normas",
    categoryClass: "category-normas",
    keywords: "wcag 2.2 emag 3.1 abnt nbr 17060 17225 w3c níveis a aa aaa normas brasileiras",
    snippet: "Diretrizes de Acessibilidade da W3C (níveis A, AA, AAA), eMAG do governo federal e normas ABNT 17060 e 17225."
  },
  {
    id: "principios-pour",
    title: "Os 4 Princípios POUR da WCAG (Perceptível, Operável, Compreensível, Robusto)",
    category: "Normas",
    categoryClass: "category-normas",
    keywords: "pour perceptível operável compreensível robusto princípios wcag fundamentos",
    snippet: "1. Perceptível, 2. Operável, 3. Compreensível e 4. Robusto — pilares de qualquer aplicação acessível."
  },

  // Diretrizes Textuais
  {
    id: "texto-paragrafos",
    title: "Parágrafos Semânticos no HTML (<p>)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "parágrafos tag p tag br leitor de tela semântica quebra de linha",
    snippet: "Cada parágrafo deve estar dentro de <p>; evitar a tag <br> para separar ideias para não confundir tecnologias assistivas."
  },
  {
    id: "texto-tamanho-zoom",
    title: "Tamanho de Fonte e Redimensionamento (Zoom 200%)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "tamanho fonte zoom 200% escala redimensionamento mínimo 16px wcag",
    snippet: "Tamanho mínimo recomendado de 16px e suporte a ampliação de até 200% sem quebrar o layout nem perder funções."
  },
  {
    id: "texto-alinhamento-largura",
    title: "Alinhamento de Texto e Limite de 80 Caracteres",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "alinhamento à esquerda nunca justificar justificado 80 caracteres glifos legibilidade",
    snippet: "Alinhamento sempre à esquerda (para idiomas ocidentais), nunca justificado, e blocos de no máximo 80 caracteres."
  },
  {
    id: "texto-reflow-320px",
    title: "Realinhamento de Tela e Reflow (320px CSS)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "reflow 320px zoom 400% rolagem bidimensional horizontal responsivo",
    snippet: "Garantir apresentação sem rolagem horizontal dupla para larguras equivalentes a 320px CSS (zoom 400% em 1280px)."
  },
  {
    id: "texto-espacamento",
    title: "Espaçamento de Texto: Linhas, Parágrafos, Letras e Palavras",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "espaçamento entrelinhas 1.5 parágrafos 2x letras 0.12 palavras 0.16 line-height letter-spacing",
    snippet: "Entrelinhas de no mínimo 1.5x, parágrafos de 2x, entre letras de 0.12x e palavras de 0.16x o tamanho da fonte."
  },
  {
    id: "texto-contraste",
    title: "Contraste Textual Mínimo (4.5:1 e 3:1)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "contraste 4.5:1 3:1 texto normal grande webaim adobe color checker nível aa",
    snippet: "Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande/ampliado (Nível AA)."
  },
  {
    id: "contraste-nao-textual",
    title: "Contraste Não Textual para Botões e Ícones (3:1)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "contraste não textual 3:1 botões ícones inputs bordas estados foco hover",
    snippet: "Contraste mínimo de 3:1 entre componentes de interface (botões, inputs, gráficos) e cores adjacentes."
  },
  {
    id: "uso-de-cores",
    title: "Uso de Cores: Nunca Depender Exclusivamente da Cor",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "uso de cores redundância cor única erro sucesso ícones texto",
    snippet: "A cor não pode ser o único meio de transmitir instruções, status de erro/sucesso ou diferenciar elementos."
  },
  {
    id: "indicacao-de-link",
    title: "Indicação de Links Significativos (Evitar 'Clique Aqui')",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "links texto âncora clique aqui saiba mais leia mais descritivo título link",
    snippet: "Links devem descrever claramente o destino ou ação; nunca use termos vagos como 'clique aqui' ou 'saiba mais'."
  },
  {
    id: "formularios-acessiveis",
    title: "Formulários Acessíveis: Labels, Agrupamento e Validação",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "formulários label fieldset legend validação mensagens de erro wai-aria inputs",
    snippet: "Associação explícita com <label>, agrupamento com <fieldset>/<legend>, instruções claras e notificações de erro."
  },
  {
    id: "listas-semanticas",
    title: "Listas Estruturadas (ul, ol e dl)",
    category: "Texto",
    categoryClass: "category-textual",
    keywords: "listas ul ol li dl dt dd leitor de tela voiceover semântica",
    snippet: "Uso de listas não ordenadas (ul), ordenadas (ol) e de descrição (dl, dt, dd) com estrutura HTML adequada."
  },

  // Imagens
  {
    id: "imagens-informativas",
    title: "Imagens Informativas e Textos Alternativos (alt)",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "imagens texto alternativo alt 100 150 caracteres fotos gráficos fotos equipe",
    snippet: "Descrever com clareza o conteúdo e a mensagem da imagem no atributo alt (geralmente entre 100 e 150 caracteres)."
  },
  {
    id: "imagens-decorativas",
    title: "Imagens Decorativas: Atributo alt='' Vazio",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "imagens decorativas alt vazio alt='' leitor de tela ignorar",
    snippet: "Imagens meramente visuais sem conteúdo informativo devem conter alt='' vazio para serem ignoradas por leitores de tela."
  },
  {
    id: "imagens-funcionais",
    title: "Imagens Funcionais em Botões e Links",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "imagens funcionais botão link ícone impressora lupa busca ação",
    snippet: "O texto alternativo de imagens clicáveis deve descrever a função ou destino da ação, e não o desenho do ícone."
  },
  {
    id: "imagens-com-texto",
    title: "Imagens com Texto: Evitar e Priorizar HTML/CSS",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "imagens com texto banners evitar texto legibilidade responsivo css",
    snippet: "Não incrustar textos importantes dentro de imagens rasterizadas; construir textos usando HTML e CSS."
  },
  {
    id: "imagens-complexas",
    title: "Imagens Complexas: Gráficos, Diagramas e Tabelas",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "imagens complexas gráficos diagramas descrição longa longdesc contexto tabela de dados",
    snippet: "Fornecer descrições textuais ricas no próprio contexto da página ou em link complementar com tabela de dados."
  },
  {
    id: "tabelas-acessiveis",
    title: "Tabelas de Dados Acessíveis (th, td, scope)",
    category: "Imagens",
    categoryClass: "category-visual",
    keywords: "tabelas th td scope headers cabeçalhos dados linhas colunas leitor de tela",
    snippet: "Marcação semântica com <th>, <td>, atributos scope e headers para associar claramente cabeçalhos e células."
  },

  // Vídeo e Áudio
  {
    id: "video-legendas",
    title: "Legendas em Vídeos (WebVTT e Legendas ao Vivo)",
    category: "Vídeo",
    categoryClass: "category-auditivo",
    keywords: "legendas vídeo webvtt ao vivo pré-gravado áudio sincronizado legendagem",
    snippet: "Fornecer legendas sincronizadas pré-gravadas (WebVTT) e ao vivo; legendas automáticas exigem revisão prévia."
  },
  {
    id: "video-audiodescricao",
    title: "Audiodescrição e Audiodescrição Estendida",
    category: "Vídeo",
    categoryClass: "category-visual",
    keywords: "audiodescrição estendida vídeo narração cenas expressões ambiente",
    snippet: "Descrição falada de elementos visuais importantes (cenários, ações, expressões) para usuários cegos."
  },
  {
    id: "video-midia-alternativa",
    title: "Mídia Alternativa e Transcrições Textuais Completas",
    category: "Vídeo",
    categoryClass: "category-auditivo",
    keywords: "mídia alternativa transcrição completa texto descrições oradores sons",
    snippet: "Documento textual que sequencia diálogos, identificação de oradores e descrições do ambiente visual."
  },
  {
    id: "video-libras",
    title: "Tradução em LIBRAS: Boas Práticas de Gravação e Enquadramento",
    category: "Vídeo",
    categoryClass: "category-auditivo",
    keywords: "libras língua de sinais intérprete enquadramento contraste fundo sólido janela vlibras",
    snippet: "Gravação profissional de intérprete humano, da cintura até acima da cabeça, com fundo sólido e alto contraste."
  },

  // Estrutura & Navegabilidade
  {
    id: "estrutura-cabecalhos",
    title: "Estrutura Hierárquica de Cabeçalhos (H1 a H6)",
    category: "Estrutura",
    categoryClass: "category-estrutura",
    keywords: "cabeçalhos h1 h2 h3 h4 h5 h6 hierarquia título único pular níveis",
    snippet: "Apenas um <h1> por página como título principal, seguido por <h2> a <h6> em ordem estrita sem pular níveis."
  },
  {
    id: "estrutura-regioes",
    title: "Regiões Semânticas HTML5 (main, nav, aside, footer)",
    category: "Estrutura",
    categoryClass: "category-estrutura",
    keywords: "regiões semânticas main nav aside footer header landmarks wai-aria",
    snippet: "Uso das tags HTML5 <main>, <nav>, <aside> e <footer> para orientar sintetizadores de voz e tecnologias assistivas."
  },
  {
    id: "estrutura-carrossel",
    title: "Carrosséis Acessíveis: Controle e Pausa",
    category: "Estrutura",
    categoryClass: "category-estrutura",
    keywords: "carrossel slider listas pausar parar passar slides teclado",
    snippet: "Estruturar itens como listas não ordenadas e fornecer controles por teclado e botão de pausar rotação."
  },
  {
    id: "navegacao-teclado",
    title: "Navegação por Teclado e Foco Visível Sem Armadilhas",
    category: "Navegação",
    categoryClass: "category-estrutura",
    keywords: "teclado foco visual visível tab shift tab armadilha de teclado outline tabindex",
    snippet: "Toda a interface deve ser operável por teclado, com indicador de foco nítido e sem prender o usuário em componentes."
  },
  {
    id: "tempo-ajustavel",
    title: "Tempo de Navegação Ajustável: Desligar, Ajustar ou Prolongar",
    category: "Navegação",
    categoryClass: "category-estrutura",
    keywords: "tempo limite de tempo expirar sessão estender prolongar 20 segundos",
    snippet: "Oferecer opções para desligar, ajustar para 10x ou prolongar o tempo limite de sessões com aviso prévio."
  },
  {
    id: "animacoes-movimento",
    title: "Controle de Movimento e Animações Automáticas",
    category: "Navegação",
    categoryClass: "category-estrutura",
    keywords: "animações movimento pausar parar ocultar piscar fotos mais de 5 segundos",
    snippet: "Mecanismo para pausar, parar ou ocultar qualquer movimento ou animação automática com duração superior a 5 segundos."
  },
  {
    id: "design-feedback-consistencia",
    title: "Design Consistente, Feedback Visível e Viewports",
    category: "Design",
    categoryClass: "category-normas",
    keywords: "design consistente feedback orientação breadcrumbs viewports zoom telas",
    snippet: "Manter navegação uniforme, apresentar feedbacks claros em ações e garantir que o design suporte múltiplos viewports."
  },
  {
    id: "referencias-bibliograficas",
    title: "Referências Bibliográficas, Normas e Legislação",
    category: "Legislação",
    categoryClass: "category-normas",
    keywords: "referências notas bibliografia leis artigos abnt manual decreto",
    snippet: "Compilado de todas as 29 fontes bibliográficas oficiais, leis federais, decretos e publicações científicas citadas."
  }
];

// ==========================================================================
// CONTROLE DE ROLAGEM E SINCRONIZAÇÃO DA SIDEBAR (Anti-Jerk / Anti-Bounce)
// ==========================================================================
let isProgrammaticScrolling = false;
let programmaticScrollTimer = null;

function setProgrammaticScrolling(duration = 1200) {
  isProgrammaticScrolling = true;
  clearTimeout(programmaticScrollTimer);
  programmaticScrollTimer = setTimeout(() => {
    isProgrammaticScrolling = false;
  }, duration);
}

// Libera imediatamente se o usuário rolar manualmente com mouse ou toque
window.addEventListener("wheel", () => { isProgrammaticScrolling = false; }, { passive: true });
window.addEventListener("touchmove", () => { isProgrammaticScrolling = false; }, { passive: true });
if ("onscrollend" in window) {
  window.addEventListener("scrollend", () => { isProgrammaticScrolling = false; }, { passive: true });
}

// Rola exclusivamente a caixa do sumário (.sidebar-toc), sem afetar a rolagem da página (window)
function scrollLinkIntoSidebarView(link) {
  const sidebar = document.querySelector(".sidebar-toc");
  if (!sidebar || !link) return;

  const sidebarRect = sidebar.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  // Se o link já está visível dentro da área visível do sumário, não move
  if (linkRect.top >= sidebarRect.top + 30 && linkRect.bottom <= sidebarRect.bottom - 30) {
    return;
  }

  // Centraliza o link no sumário lateral de forma suave
  const relativeTop = linkRect.top - sidebarRect.top + sidebar.scrollTop;
  const targetScrollTop = relativeTop - (sidebar.clientHeight / 2) + (link.clientHeight / 2);

  sidebar.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: "smooth"
  });
}

function initSearchAutocomplete() {
  const searchInput = document.getElementById("search-input");
  const suggestionsDropdown = document.getElementById("search-suggestions");
  const suggestionsList = document.getElementById("suggestions-list");
  const suggestionsCount = document.getElementById("suggestions-count");
  const clearBtn = document.getElementById("search-clear-btn");
  const liveAnnouncer = document.getElementById("search-live-announcer");

  if (!searchInput || !suggestionsDropdown || !suggestionsList) return;

  let activeIndex = -1;
  let currentMatches = [];

  // Atalho de teclado: Ctrl+K ou Barra '/' foca a busca
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === "k") || (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // Digitação em tempo real (Autocomplete instantâneo)
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length > 0 && clearBtn) {
      clearBtn.style.display = "flex";
    } else if (clearBtn) {
      clearBtn.style.display = "none";
    }

    if (query.length < 2) {
      closeDropdown();
      return;
    }

    renderSuggestions(query);
  });

  // Limpeza de busca
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      closeDropdown();
      searchInput.focus();
    });
  }

  // Navegação por teclado nas sugestões (Cima, Baixo, Enter, Esc)
  searchInput.addEventListener("keydown", (e) => {
    if (!suggestionsDropdown.classList.contains("is-open")) {
      if (e.key === "ArrowDown" && searchInput.value.trim().length >= 2) {
        renderSuggestions(searchInput.value.trim().toLowerCase());
      }
      return;
    }

    const items = suggestionsList.querySelectorAll(".suggestion-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < currentMatches.length) {
        selectSuggestion(currentMatches[activeIndex].id);
      } else if (currentMatches.length > 0) {
        selectSuggestion(currentMatches[0].id);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown();
    }
  });

  // Fechar ao clicar fora
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  function renderSuggestions(query) {
    const queryTokens = query.split(/\s+/).filter(t => t.length > 0);

    currentMatches = searchDatabase.filter(item => {
      const fullText = (item.title + " " + item.keywords + " " + item.snippet).toLowerCase();
      return queryTokens.every(token => fullText.includes(token));
    }).slice(0, 8); // Top 8 sugestões mais relevantes

    activeIndex = -1;
    suggestionsList.innerHTML = "";

    if (currentMatches.length === 0) {
      suggestionsList.innerHTML = `
        <li class="suggestions-empty" role="status">
          Nenhuma sugestão encontrada para "<strong>${escapeHtml(query)}</strong>".<br>
          Tente termos como: <em>contraste, alt, teclado, libras, censo, zoom</em>.
        </li>`;
      suggestionsCount.textContent = "0";
      openDropdown();
      if (liveAnnouncer) liveAnnouncer.textContent = "Nenhum resultado encontrado.";
      return;
    }

    suggestionsCount.textContent = currentMatches.length.toString();

    currentMatches.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "suggestion-item";
      li.setAttribute("role", "option");
      li.setAttribute("id", `suggestion-opt-${index}`);
      li.setAttribute("tabindex", "-1");

      const highlightedTitle = highlightMatches(item.title, queryTokens);
      const highlightedSnippet = highlightMatches(item.snippet, queryTokens);

      li.innerHTML = `
        <div class="suggestion-meta">
          <span class="suggestion-category-tag ${item.categoryClass}">${item.category}</span>
        </div>
        <div class="suggestion-title">${highlightedTitle}</div>
        <div class="suggestion-snippet">${highlightedSnippet}</div>
      `;

      li.addEventListener("click", () => {
        selectSuggestion(item.id);
      });

      suggestionsList.appendChild(li);
    });

    openDropdown();
    if (liveAnnouncer) {
      liveAnnouncer.textContent = `${currentMatches.length} sugestões disponíveis para ${query}. Use as setas para navegar.`;
    }
  }

  function updateActiveItem(items) {
    items.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add("is-selected");
        item.scrollIntoView({ block: "nearest" });
        searchInput.setAttribute("aria-activedescendant", item.id);
      } else {
        item.classList.remove("is-selected");
      }
    });
  }

  function selectSuggestion(targetId) {
    closeDropdown();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setProgrammaticScrolling(1200);

      const toolbar = document.querySelector(".a11y-toolbar");
      const offset = (toolbar ? toolbar.offsetHeight : 54) + 16;
      const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });

      // Atualiza e centraliza o item no sumário lateral se existir
      const matchingTocLink = document.querySelector(`.sidebar-toc .toc-link[href="#${targetId}"]`);
      if (matchingTocLink) {
        document.querySelectorAll(".sidebar-toc .toc-link").forEach(l => l.classList.remove("is-active"));
        matchingTocLink.classList.add("is-active");
        scrollLinkIntoSidebarView(matchingTocLink);
      }

      targetElement.classList.remove("target-pulse");
      void targetElement.offsetWidth; // força reflow
      targetElement.classList.add("target-pulse");
      targetElement.setAttribute("tabindex", "-1");
      targetElement.focus({ preventScroll: true });
      history.pushState(null, "", `#${targetId}`);
    }
  }

  function openDropdown() {
    suggestionsDropdown.classList.add("is-open");
    searchInput.setAttribute("aria-expanded", "true");
  }

  function closeDropdown() {
    suggestionsDropdown.classList.remove("is-open");
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.removeAttribute("aria-activedescendant");
    activeIndex = -1;
  }

  function highlightMatches(text, tokens) {
    if (!tokens || !tokens.length) return escapeHtml(text);
    let escaped = escapeHtml(text);
    tokens.forEach(tok => {
      if (tok.length < 2) return;
      const regex = new RegExp(`(${escapeRegex(tok)})`, "gi");
      escaped = escaped.replace(regex, "<mark>$1</mark>");
    });
    return escaped;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}

/* ==========================================================================
   2. TOOLBAR DE ACESSIBILIDADE INTEGRADA
   ========================================================================== */

function initAccessibilityToolbar() {
  const fontSizes = [1, 1.15, 1.3, 1.5];
  let currentFontIndex = 0;

  // Restaurar preferências salvas
  const savedFont = localStorage.getItem("a11y_font_scale");
  if (savedFont) {
    document.documentElement.style.setProperty("--font-scale", savedFont);
    currentFontIndex = fontSizes.indexOf(parseFloat(savedFont));
    if (currentFontIndex === -1) currentFontIndex = 0;
  }

  if (localStorage.getItem("a11y_high_contrast") === "true") {
    document.body.classList.add("high-contrast");
    updateBtnState("btn-contrast-high", true);
  }

  if (localStorage.getItem("a11y_dark_mode") === "true") {
    document.body.classList.add("dark-mode");
    updateBtnState("btn-dark-mode", true);
  }

  if (localStorage.getItem("a11y_dyslexia") === "true") {
    document.body.classList.add("dyslexia-font");
    updateBtnState("btn-dyslexia", true);
  }

  if (localStorage.getItem("a11y_spaced_text") === "true") {
    document.body.classList.add("spaced-text");
    updateBtnState("btn-spaced-text", true);
  }

  if (localStorage.getItem("a11y_underline_links") === "true") {
    document.body.classList.add("underline-links");
    updateBtnState("btn-underline-links", true);
  }

  // Aumentar fonte
  const btnFontIncrease = document.getElementById("btn-font-increase");
  if (btnFontIncrease) {
    btnFontIncrease.addEventListener("click", () => {
      if (currentFontIndex < fontSizes.length - 1) {
        currentFontIndex++;
        applyFontScale(fontSizes[currentFontIndex]);
      }
    });
  }

  // Diminuir fonte
  const btnFontDecrease = document.getElementById("btn-font-decrease");
  if (btnFontDecrease) {
    btnFontDecrease.addEventListener("click", () => {
      if (currentFontIndex > 0) {
        currentFontIndex--;
        applyFontScale(fontSizes[currentFontIndex]);
      }
    });
  }

  function applyFontScale(scale) {
    document.documentElement.style.setProperty("--font-scale", scale);
    localStorage.setItem("a11y_font_scale", scale.toString());
  }

  // Alto contraste
  const btnHighContrast = document.getElementById("btn-contrast-high");
  if (btnHighContrast) {
    btnHighContrast.addEventListener("click", () => {
      document.body.classList.remove("dark-mode");
      updateBtnState("btn-dark-mode", false);
      localStorage.setItem("a11y_dark_mode", "false");

      const isActive = document.body.classList.toggle("high-contrast");
      updateBtnState("btn-contrast-high", isActive);
      localStorage.setItem("a11y_high_contrast", isActive.toString());
    });
  }

  // Modo Escuro
  const btnDarkMode = document.getElementById("btn-dark-mode");
  if (btnDarkMode) {
    btnDarkMode.addEventListener("click", () => {
      document.body.classList.remove("high-contrast");
      updateBtnState("btn-contrast-high", false);
      localStorage.setItem("a11y_high_contrast", "false");

      const isActive = document.body.classList.toggle("dark-mode");
      updateBtnState("btn-dark-mode", isActive);
      localStorage.setItem("a11y_dark_mode", isActive.toString());
    });
  }

  // Fonte Dislexia
  const btnDyslexia = document.getElementById("btn-dyslexia");
  if (btnDyslexia) {
    btnDyslexia.addEventListener("click", () => {
      const isActive = document.body.classList.toggle("dyslexia-font");
      updateBtnState("btn-dyslexia", isActive);
      localStorage.setItem("a11y_dyslexia", isActive.toString());
    });
  }

  // Espaçamento Aumentado (WCAG 2.2)
  const btnSpaced = document.getElementById("btn-spaced-text");
  if (btnSpaced) {
    btnSpaced.addEventListener("click", () => {
      const isActive = document.body.classList.toggle("spaced-text");
      updateBtnState("btn-spaced-text", isActive);
      localStorage.setItem("a11y_spaced_text", isActive.toString());
    });
  }

  // Sublinhar Links
  const btnUnderline = document.getElementById("btn-underline-links");
  if (btnUnderline) {
    btnUnderline.addEventListener("click", () => {
      const isActive = document.body.classList.toggle("underline-links");
      updateBtnState("btn-underline-links", isActive);
      localStorage.setItem("a11y_underline_links", isActive.toString());
    });
  }

  // Resetar Tudo
  const btnReset = document.getElementById("btn-a11y-reset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      document.body.classList.remove("high-contrast", "dark-mode", "dyslexia-font", "spaced-text", "underline-links");
      document.documentElement.style.setProperty("--font-scale", "1");
      currentFontIndex = 0;
      localStorage.clear();

      document.querySelectorAll(".a11y-btn").forEach(btn => {
        if (btn.id !== "btn-a11y-reset") btn.classList.remove("is-active");
      });
    });
  }

  function updateBtnState(id, isActive) {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (isActive) {
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-pressed", "false");
    }
  }
}

/* ==========================================================================
   3. SUMÁRIO HIERÁRQUICO (TOC) COM SCROLLSPY ESTÁVEL E FILTRO RÁPIDO
   ========================================================================== */

function initTableOfContents() {
  const tocLinks = document.querySelectorAll(".sidebar-toc .toc-link");
  const filterInput = document.getElementById("toc-filter-input");

  if (!tocLinks.length) return;

  // Mapeia todos os elementos alvos existentes referenciados pelo sumário
  const targetItems = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        targetItems.push({ id: href.slice(1), element: el, link: link });
      }
    }
  });

  // Filtro interativo no sumário
  if (filterInput) {
    filterInput.addEventListener("input", () => {
      const term = filterInput.value.trim().toLowerCase();
      document.querySelectorAll(".toc-tree-item").forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Navegação suave e precisa ao clicar nos tópicos do sumário
  tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();

      // Trava o scrollspy para evitar conflito com as seções intermediárias durante a rolagem
      setProgrammaticScrolling(1200);

      // Marca o link como ativo imediatamente e centraliza na sidebar
      tocLinks.forEach(l => l.classList.remove("is-active"));
      link.classList.add("is-active");
      scrollLinkIntoSidebarView(link);

      // Calcula a rolagem exata compensando a barra flutuante de acessibilidade
      const toolbar = document.querySelector(".a11y-toolbar");
      const offset = (toolbar ? toolbar.offsetHeight : 54) + 16;
      const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });

      // Atualiza a URL sem saltos bruscos
      history.pushState(null, "", href);

      // Animação de pulso para identificação visual do tópico alcançado
      targetElement.classList.remove("target-pulse");
      void targetElement.offsetWidth;
      targetElement.classList.add("target-pulse");

      // Foco acessível sem forçar rolagem
      targetElement.setAttribute("tabindex", "-1");
      targetElement.focus({ preventScroll: true });
    });
  });

  // ScrollSpy ultra-eficiente e sem travamentos durante a leitura manual
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (isProgrammaticScrolling || targetItems.length === 0) return;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveTocItem();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  function updateActiveTocItem() {
    if (isProgrammaticScrolling || targetItems.length === 0) return;

    const toolbar = document.querySelector(".a11y-toolbar");
    const offset = (toolbar ? toolbar.offsetHeight : 54) + 30;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Se estiver no final da página, ativa o último item
    if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 50) {
      const lastItem = targetItems[targetItems.length - 1];
      setActiveLink(lastItem.link);
      return;
    }

    // Encontra o tópico atual baseado na posição de rolagem
    let activeItem = targetItems[0];
    for (let i = 0; i < targetItems.length; i++) {
      const item = targetItems[i];
      const rect = item.element.getBoundingClientRect();
      if (rect.top <= offset) {
        activeItem = item;
      } else {
        break;
      }
    }

    if (activeItem) {
      setActiveLink(activeItem.link);
    }
  }

  function setActiveLink(activeLink) {
    let changed = false;
    tocLinks.forEach(l => {
      if (l === activeLink) {
        if (!l.classList.contains("is-active")) {
          l.classList.add("is-active");
          changed = true;
        }
      } else {
        l.classList.remove("is-active");
      }
    });

    if (changed) {
      scrollLinkIntoSidebarView(activeLink);
    }
  }

  // Inicializa a posição do sumário
  updateActiveTocItem();
}

/* ==========================================================================
   4. MODAL DE IMAGENS (LIGHTBOX ACESSÍVEL)
   ========================================================================== */

function initImageModal() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal || !modalImg || !closeBtn) return;

  let lastActiveElement = null;

  document.querySelectorAll(".figure-img-wrap, .figure-zoom-btn").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      const figure = trigger.closest(".content-figure");
      if (!figure) return;
      const img = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      if (img) {
        lastActiveElement = document.activeElement;
        modalImg.src = img.src;
        modalImg.alt = img.alt || "Imagem ampliada";
        modalCaption.textContent = caption ? caption.textContent : img.alt || "";
        modal.classList.add("is-active");
        modal.setAttribute("aria-hidden", "false");
        closeBtn.focus();
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement) lastActiveElement.focus();
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. BOTÕES DE CÓPIA DE CÓDIGO HTML
   ========================================================================== */

function initCodeCopyButtons() {
  document.querySelectorAll(".code-copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const codeBlock = btn.closest(".code-card")?.querySelector("code");
      if (!codeBlock) return;
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copiado!";
        btn.style.borderColor = "var(--rio-cyan-vivid)";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = "";
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   6. BOTÃO VOLTAR AO TOPO
   ========================================================================== */

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  });

  btn.addEventListener("click", () => {
    setProgrammaticScrolling(1000);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const headerTitle = document.querySelector(".header-title-wrap h1");
    if (headerTitle) {
      headerTitle.setAttribute("tabindex", "-1");
      headerTitle.focus({ preventScroll: true });
    }
  });
}

/* ==========================================================================
   7. BARRA DE PROGRESSO DE LEITURA
   ========================================================================== */

function initReadingProgress() {
  const bar = document.getElementById("reading-progress-bar");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });
}
