/**
 * GUIA DE BOAS PRÁTICAS DE ACESSIBILIDADE DIGITAL - PREFEITURA DO RIO
 * Motor de busca em tempo real com sugestões dinâmicas (Autocomplete),
 * ScrollSpy hierárquico, Toolbar de Acessibilidade e Lightbox acessível.
 */

document.addEventListener("DOMContentLoaded", () => {
  loadCustomContentIfPresent();
  initSearchAutocomplete();
  initAccessibilityToolbar();
  initTableOfContents();
  initImageModal();
  initCodeCopyButtons();
  initBackToTop();
  initReadingProgress();
  initRealtimeSync();
});

/* --- CARREGAMENTO DE CONTEUDO EDITADO NO PAINEL ADMIN (SE EXISTIR) --- */
function loadCustomContentIfPresent() {
  const customContent = localStorage.getItem("guia_custom_content");
  const mainEl = document.getElementById("conteudo-principal");
  if (customContent && mainEl && customContent.trim().length > 50) {
    mainEl.innerHTML = customContent;
    rebuildTableOfContents();
  }
}

/* --- SINCRONIZAÇÃO EM TEMPO REAL COM O PAINEL DE ADMINISTRAÇÃO --- */
function initRealtimeSync() {
  function applyLiveContent(newHtml) {
    const mainEl = document.getElementById("conteudo-principal");
    if (!mainEl || !newHtml || newHtml.trim().length < 50) return;
    
    // Atualiza o conteúdo da página imediatamente
    mainEl.innerHTML = newHtml;

    // Reconstrói sumário dinamicamente para refletir novos capítulos/subtítulos
    rebuildTableOfContents();
    initTableOfContents();

    // Notifica visualmente com um toast acessível
    showSiteUpdateToast("O portal foi atualizado em tempo real pelo editor!");
  }

  function handleReset() {
    window.location.reload();
  }

  // 1. Canal BroadcastChannel nativo do navegador (zero delay entre abas/janelas)
  if ("BroadcastChannel" in window) {
    try {
      const channel = new BroadcastChannel("guia_content_sync");
      channel.onmessage = (event) => {
        if (!event.data) return;
        if (event.data.type === "UPDATE_CONTENT" && event.data.html) {
          applyLiveContent(event.data.html);
        } else if (event.data.type === "RESET_CONTENT") {
          handleReset();
        }
      };
    } catch (e) {
      console.warn("BroadcastChannel não suportado neste navegador:", e);
    }
  }

  // 2. Evento Storage (sincronização cross-tab alternativa)
  window.addEventListener("storage", (e) => {
    if (e.key === "guia_custom_content") {
      if (e.newValue) {
        applyLiveContent(e.newValue);
      } else {
        handleReset();
      }
    }
  });
}

function showSiteUpdateToast(message) {
  let toast = document.getElementById("site-sync-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-sync-toast";
    toast.className = "site-sync-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color: var(--rio-cyan-vivid, #00C0F3); flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message || "Site atualizado com sucesso!"}</span>
  `;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function rebuildTableOfContents() {
  const tocTree = document.querySelector(".sidebar-toc .toc-tree");
  const mainEl = document.getElementById("conteudo-principal");
  if (!tocTree || !mainEl) return;

  const sections = mainEl.querySelectorAll(".content-section");
  if (!sections.length) return;

  let newTocHtml = "";
  sections.forEach((section, sIdx) => {
    const secId = section.id || `capitulo-${sIdx + 1}`;
    if (!section.id) section.id = secId;

    const headingEl = section.querySelector(".section-heading");
    const headingText = headingEl ? headingEl.textContent.trim() : `Capítulo ${sIdx + 1}`;

    const subItems = [];
    section.querySelectorAll("article[id], h3.subsection-heading").forEach(item => {
      let subId = "";
      let subTitle = "";
      if (item.tagName.toLowerCase() === "article" && item.id) {
        subId = item.id;
        const h3 = item.querySelector("h3, .subsection-heading");
        subTitle = h3 ? h3.textContent.trim() : item.id;
      } else if (item.tagName.toLowerCase() === "h3") {
        if (!item.closest("article")) {
          subId = item.id || `sub-${sIdx + 1}-${subItems.length + 1}`;
          if (!item.id) item.id = subId;
          subTitle = item.textContent.trim();
        }
      }
      if (subId && subTitle && !subItems.some(x => x.id === subId)) {
        subItems.push({ id: subId, title: subTitle });
      }
    });

    let sublistHtml = "";
    if (subItems.length > 0) {
      sublistHtml = '<ul class="toc-sublist">';
      subItems.forEach((sub, i) => {
        sublistHtml += `<li><a href="#${sub.id}" class="toc-link">${sIdx + 1}.${i + 1} ${escapeHtml(sub.title)}</a></li>`;
      });
      sublistHtml += '</ul>';
    }

    newTocHtml += `
      <li class="toc-tree-item">
        <a href="#${secId}" class="toc-link">${sIdx + 1}. ${escapeHtml(headingText)}</a>
        ${sublistHtml}
      </li>
    `;
  });

  tocTree.innerHTML = newTocHtml;
}


/* ==========================================================================
   1. MOTOR DE PESQUISA COM SUGESTÕES EM TEMPO REAL (AUTOCOMPLETE)
   ========================================================================== */

// Base de dados indexada para o autocomplete em tempo real
const searchDatabase = [
  {
    "id": "pessoas-com-deficiencia-definicao",
    "title": "Pessoas com Deficiência: definição",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "pessoas com deficiência definição segundo ministério saúde brasileiro, “pessoas aquelas impedimento",
    "snippet": "Segundo o Ministério da Saúde brasileiro, “pessoas com deficiência são aquelas que têm impedimento de médio ou longo prazo de natureza física, mental, intele..."
  },
  {
    "id": "tipos-de-deficiencia",
    "title": "Tipos de Deficiência",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "tipos de deficiência refere origem deficiência, ministério saúde reconhece congênita (quando",
    "snippet": "No que se refere à origem da deficiência, o Ministério da Saúde reconhece que ela pode ser congênita (quando a pessoa já nasce com a deficiência) ou adquirid..."
  },
  {
    "id": "direitos-das-pessoas-com-deficiencia",
    "title": "Direitos das Pessoas com Deficiência",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "direitos das pessoas com deficiência convenção sobre (2006) primeiro",
    "snippet": "A Convenção sobre os Direitos das Pessoas com Deficiência da ONU (2006) foi o primeiro tratado internacional a reconhecer a importância do respeito à diferen..."
  },
  {
    "id": "tipos-de-acessibilidade",
    "title": "Tipos de Acessibilidade",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "tipos de acessibilidade brasileira inclusão definida como:",
    "snippet": "Na Lei Brasileira de Inclusão acessibilidade  é definida como:"
  },
  {
    "id": "acessibilidade-digital-entendendo-o-conceito",
    "title": "Acessibilidade Digital: entendendo o conceito",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "acessibilidade digital entendendo o conceito brasileira inclusão prevista digital, eliminação barreiras",
    "snippet": "Na Lei Brasileira de Inclusão, está prevista a acessibilidade digital, que é a eliminação de barreiras na Web. Ela determina que todo tipo de página web seja..."
  },
  {
    "id": "uso-de-servicos-publicos-digitais",
    "title": "Uso de Serviços Públicos Digitais",
    "category": "Compreendendo ",
    "categoryClass": "category-estrutura",
    "keywords": "uso de serviços públicos digitais último levantamento banco interamericano desenvolvimento (bid) sobre",
    "snippet": "O último levantamento do Banco Interamericano de Desenvolvimento (BID) sobre o uso de serviços digitais no Brasil[17], publicado em 2025, evidencia que a dis..."
  },
  {
    "id": "deficiencia-visual",
    "title": "Deficiência Visual",
    "category": "Tipos de defic",
    "categoryClass": "category-estrutura",
    "keywords": "deficiência visual",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "principais-dificuldades-de-uso",
    "title": "Principais dificuldades de uso",
    "category": "Tipos de defic",
    "categoryClass": "category-estrutura",
    "keywords": "principais dificuldades de uso práticas:",
    "snippet": "Boas práticas:"
  },
  {
    "id": "boas-praticas",
    "title": "Boas práticas",
    "category": "Tipos de defic",
    "categoryClass": "category-estrutura",
    "keywords": "boas práticas daltonismo alteração percepção cores devido funcionamento ausência cones",
    "snippet": "3) Daltonismo: Alteração na percepção das cores devido ao funcionamento ou ausência dos cones da retina, células responsáveis por identificar as cores. O dal..."
  },
  {
    "id": "boas-praticas",
    "title": "Boas práticas",
    "category": "Tipos de defic",
    "categoryClass": "category-estrutura",
    "keywords": "boas práticas",
    "snippet": ""
  },
  {
    "id": "deficiencia-auditiva",
    "title": "Deficiência Auditiva",
    "category": "Boas práticas",
    "categoryClass": "category-estrutura",
    "keywords": "deficiência auditiva surdez total parcial: condição afetar percepção diferentes graus,",
    "snippet": "1) Surdez total ou parcial: Essa condição pode afetar a percepção dos sons e, em diferentes graus, a comunicação oral."
  },
  {
    "id": "deficiencia-intelectual-cognitiva",
    "title": "Deficiência Intelectual / Cognitiva",
    "category": "Boas práticas",
    "categoryClass": "category-estrutura",
    "keywords": "deficiência intelectual cognitiva deficiências cognitiva, dificuldades práticas costumam repetir tipos",
    "snippet": "No caso de deficiências intelectual e cognitiva, as dificuldades e boas práticas costumam se repetir em cada um dos tipos de deficiência. Para que a lista nã..."
  },
  {
    "id": "perceptivel",
    "title": "Perceptível",
    "category": "Boas práticas ",
    "categoryClass": "category-estrutura",
    "keywords": "perceptível",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "operavel",
    "title": "Operável",
    "category": "Boas práticas ",
    "categoryClass": "category-estrutura",
    "keywords": "operável",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "compreensivel",
    "title": "Compreensível",
    "category": "Boas práticas ",
    "categoryClass": "category-estrutura",
    "keywords": "compreensível",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "robusto",
    "title": "Robusto",
    "category": "Boas práticas ",
    "categoryClass": "category-estrutura",
    "keywords": "robusto esses princípios dividem diretrizes desdobram critérios sucesso.",
    "snippet": "Esses princípios se dividem em diretrizes que, por sua vez, se desdobram em critérios de sucesso. As diretrizes têm como objetivo principal garantir que o co..."
  },
  {
    "id": "orientacoes-gerais",
    "title": "Orientações gerais",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "orientações gerais",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "paragrafos",
    "title": "Parágrafos",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "parágrafos",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "tamanho-de-fonte-e-redimensionamento-de-texto",
    "title": "Tamanho de fonte e redimensionamento de texto",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "tamanho de fonte e redimensionamento texto determina fonte, entanto, práticas",
    "snippet": "A WCAG não determina um tamanho de fonte, no entanto, boas práticas de design indicam o tamanho 16 como o mínimo. Além disso, a questão do redimensionamento ..."
  },
  {
    "id": "alinhamento-de-texto",
    "title": "Alinhamento de texto",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "alinhamento de texto",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "realinhamento-e-rolagem-de-tela",
    "title": "Realinhamento e rolagem de tela",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "realinhamento e rolagem de tela",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "espacamento-de-texto",
    "title": "Espaçamento de texto",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "espaçamento de texto espaçamentos devem calculados levando consideração tamanho fonte texto.",
    "snippet": "Os espaçamentos devem ser calculados levando em consideração o tamanho da fonte do texto. O layout do site deve suportar esses ajustes sem quebrar."
  },
  {
    "id": "contraste-textual",
    "title": "Contraste textual",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "contraste textual",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "contraste-nao-textual",
    "title": "Contraste não textual",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "contraste não textual",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "uso-de-cores",
    "title": "Uso de cores",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "uso de cores",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "indicacao-de-link",
    "title": "Indicação de link",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "indicação de link fornecer texto descreva finalidade",
    "snippet": "Ex.:  Fornecer um texto de link que descreva a finalidade de um link"
  },
  {
    "id": "formularios",
    "title": "Formulários",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "formulários considerações técnicas, usuários geralmente preferem simples curtos.",
    "snippet": "Além das considerações técnicas, os usuários geralmente preferem formulários simples e curtos. Solicite apenas o necessário para concluir a transação ou o pr..."
  },
  {
    "id": "listas",
    "title": "Listas",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "listas existem vários tipos lista:",
    "snippet": "Existem vários tipos de lista:"
  },
  {
    "id": "imagens-informativas",
    "title": "Imagens informativas",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "imagens informativas representam graficamente conceitos informações, geralmente figuras, fotos",
    "snippet": "Imagens que representam graficamente conceitos e informações, geralmente figuras, fotos e ilustrações."
  },
  {
    "id": "imagens-decorativas",
    "title": "Imagens decorativas",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "imagens decorativas aquela único objetivo adicionar decoração visual página, transmitir",
    "snippet": "É aquela que tem como único objetivo adicionar decoração visual à página, em vez de transmitir informações."
  },
  {
    "id": "imagens-funcionais",
    "title": "Imagens funcionais",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "imagens funcionais",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "imagens-com-texto",
    "title": "Imagens com texto",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "imagens com texto",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "imagens-complexas",
    "title": "Imagens complexas",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "imagens complexas",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "grupos-de-imagens",
    "title": "Grupos de imagens",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "grupos de imagens",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "mapas-de-imagem",
    "title": "Mapas de imagem",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "mapas de imagem dividida áreas selecionáveis. outra página",
    "snippet": "Um mapa de imagem é uma imagem dividida em áreas selecionáveis. Cada área é um link para outra página ou para outra parte da mesma página."
  },
  {
    "id": "tabelas",
    "title": "Tabelas",
    "category": "Apresentação d",
    "categoryClass": "category-estrutura",
    "keywords": "tabelas",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "orientacoes-gerais",
    "title": "Orientações gerais",
    "category": "Apresentação d",
    "categoryClass": "category-auditivo",
    "keywords": "orientações gerais",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "uso-de-legendas",
    "title": "Uso de legendas",
    "category": "Apresentação d",
    "categoryClass": "category-auditivo",
    "keywords": "uso de legendas",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "uso-de-audiodescricao",
    "title": "Uso de audiodescrição",
    "category": "Apresentação d",
    "categoryClass": "category-auditivo",
    "keywords": "uso de audiodescrição",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "midia-alternativa",
    "title": "Mídia alternativa",
    "category": "Apresentação d",
    "categoryClass": "category-auditivo",
    "keywords": "mídia alternativa",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "lingua-de-sinais",
    "title": "Língua de sinais",
    "category": "Apresentação d",
    "categoryClass": "category-auditivo",
    "keywords": "língua de sinais",
    "snippet": ""
  },
  {
    "id": "cabecalhos",
    "title": "Cabeçalhos",
    "category": "Estrutura da p",
    "categoryClass": "category-estrutura",
    "keywords": "cabeçalhos maioria sites possui página contém informações gerais site,",
    "snippet": "A maioria dos sites possui uma área no topo de cada página que contém informações gerais do site, como o logotipo, a função de busca e as opções de navegação."
  },
  {
    "id": "rodape",
    "title": "Rodapé",
    "category": "Estrutura da p",
    "categoryClass": "category-estrutura",
    "keywords": "rodapé assim cabeçalho página, maioria sites também possui região",
    "snippet": "Assim como o cabeçalho da página, a maioria dos sites também possui uma região na parte inferior de cada página que contém informações gerais do site, como i..."
  },
  {
    "id": "conteudo-principal",
    "title": "Conteúdo principal",
    "category": "Estrutura da p",
    "categoryClass": "category-estrutura",
    "keywords": "conteúdo principal",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "conteudo-complementar",
    "title": "Conteúdo complementar",
    "category": "Estrutura da p",
    "categoryClass": "category-estrutura",
    "keywords": "conteúdo complementar menu:",
    "snippet": "5. Menu:"
  },
  {
    "id": "carrossel",
    "title": "Carrossel",
    "category": "Estrutura da p",
    "categoryClass": "category-estrutura",
    "keywords": "carrossel carrosséis frequentemente usados ​​como galerias exibir série imagens.",
    "snippet": "Os carrosséis são frequentemente usados ​​como galerias para exibir uma série de imagens. No entanto, conteúdos mais complexos, como teasers, artigos ou seçõ..."
  },
  {
    "id": "navegacao-por-teclado",
    "title": "Navegação por teclado",
    "category": "Navegabilidade",
    "categoryClass": "category-estrutura",
    "keywords": "navegação por teclado",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "tempo-de-navegacao-ajustavel",
    "title": "Tempo de navegação ajustável",
    "category": "Navegabilidade",
    "categoryClass": "category-estrutura",
    "keywords": "tempo de navegação ajustável",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "controlar-movimento-de-informacoes-ou-animacoes",
    "title": "Controlar movimento de informações ou animações",
    "category": "Navegabilidade",
    "categoryClass": "category-estrutura",
    "keywords": "controlar movimento de informações ou animações",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "navegacao-clara-e-consistente",
    "title": "Navegação clara e consistente",
    "category": "Outras dicas d",
    "categoryClass": "category-estrutura",
    "keywords": "navegação clara e consistente",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "feedback-facilmente-identificavel",
    "title": "Feedback facilmente identificável",
    "category": "Outras dicas d",
    "categoryClass": "category-estrutura",
    "keywords": "feedback facilmente identificável",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
  },
  {
    "id": "design-para-diferentes-tamanhos-de-viewport",
    "title": "Design para diferentes tamanhos de viewport",
    "category": "Outras dicas d",
    "categoryClass": "category-estrutura",
    "keywords": "design para diferentes tamanhos de viewport",
    "snippet": "Consulte as diretrizes completas desta seção no guia de acessibilidade."
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
      const mobileBar = document.querySelector(".mobile-toc-bar");
      let offset = (toolbar ? toolbar.offsetHeight : 54) + 16;
      if (window.innerWidth < 1025 && mobileBar && mobileBar.offsetHeight > 0) {
        offset += mobileBar.offsetHeight;
      }
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
  const fontSizes = [1, 1.15, 1.3, 1.5, 1.75, 2.0];
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
      const a11yKeys = ["a11y_font_scale", "a11y_high_contrast", "a11y_dark_mode", "a11y_dyslexia", "a11y_spaced_text", "a11y_underline_links"];
      a11yKeys.forEach(k => localStorage.removeItem(k));

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

let currentTocTargetItems = [];
let isTocScrollSpyListening = false;

function initTableOfContents() {
  const sidebarToc = document.getElementById("navegacao-guia");
  const tocLinks = document.querySelectorAll(".sidebar-toc .toc-link");
  const filterInput = document.getElementById("toc-filter-input");
  const mobileTocToggle = document.getElementById("mobile-toc-toggle");
  const mobileTocCurrentLabel = document.getElementById("mobile-toc-current-label");
  const sidebarBackdrop = document.getElementById("sidebar-toc-backdrop");
  const tocCloseBtn = document.getElementById("toc-close-btn");

  if (!tocLinks.length) return;

  // --- CONTROLES DO SUMÁRIO EM DISPOSITIVOS MÓVEIS (DRAWER OFF-CANVAS) ---
  function openMobileToc() {
    if (!sidebarToc) return;
    sidebarToc.classList.add("is-open");
    if (sidebarBackdrop) sidebarBackdrop.classList.add("is-active");
    if (mobileTocToggle) mobileTocToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (filterInput) {
      setTimeout(() => filterInput.focus(), 150);
    } else if (tocCloseBtn) {
      tocCloseBtn.focus();
    }
  }

  function closeMobileToc() {
    if (!sidebarToc) return;
    sidebarToc.classList.remove("is-open");
    if (sidebarBackdrop) sidebarBackdrop.classList.remove("is-active");
    if (mobileTocToggle) {
      mobileTocToggle.setAttribute("aria-expanded", "false");
      mobileTocToggle.focus();
    }
    document.body.style.overflow = "";
  }

  if (sidebarToc && !sidebarToc._drawerEventsAttached) {
    sidebarToc._drawerEventsAttached = true;

    if (mobileTocToggle) {
      mobileTocToggle.addEventListener("click", () => {
        const isOpen = sidebarToc && sidebarToc.classList.contains("is-open");
        if (isOpen) {
          closeMobileToc();
        } else {
          openMobileToc();
        }
      });
    }

    if (tocCloseBtn) {
      tocCloseBtn.addEventListener("click", closeMobileToc);
    }

    if (sidebarBackdrop) {
      sidebarBackdrop.addEventListener("click", closeMobileToc);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebarToc && sidebarToc.classList.contains("is-open")) {
        closeMobileToc();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1025 && sidebarToc && sidebarToc.classList.contains("is-open")) {
        closeMobileToc();
      }
    });

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
  }

  // Mapeia todos os elementos alvos existentes referenciados pelo sumário
  currentTocTargetItems = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        currentTocTargetItems.push({ id: href.slice(1), element: el, link: link });
      }
    }
  });

  // Navegação suave e precisa ao clicar nos tópicos do sumário
  tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();

      if (window.innerWidth < 1025) {
        closeMobileToc();
      }

      setProgrammaticScrolling(1200);

      tocLinks.forEach(l => l.classList.remove("is-active"));
      link.classList.add("is-active");
      scrollLinkIntoSidebarView(link);

      const toolbar = document.querySelector(".a11y-toolbar");
      const mobileBar = document.querySelector(".mobile-toc-bar");
      let offset = (toolbar ? toolbar.offsetHeight : 54) + 16;
      if (window.innerWidth < 1025 && mobileBar && mobileBar.offsetHeight > 0) {
        offset += mobileBar.offsetHeight;
      }
      const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });

      history.pushState(null, "", href);

      targetElement.classList.remove("target-pulse");
      void targetElement.offsetWidth;
      targetElement.classList.add("target-pulse");

      targetElement.setAttribute("tabindex", "-1");
      targetElement.focus({ preventScroll: true });
    });
  });

  // ScrollSpy ultra-eficiente e sem travamentos durante a leitura manual
  if (!isTocScrollSpyListening) {
    isTocScrollSpyListening = true;
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (isProgrammaticScrolling || currentTocTargetItems.length === 0) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveTocItem();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function updateActiveTocItem() {
    if (isProgrammaticScrolling || currentTocTargetItems.length === 0) return;

    const toolbar = document.querySelector(".a11y-toolbar");
    const mobileBar = document.querySelector(".mobile-toc-bar");
    let offset = (toolbar ? toolbar.offsetHeight : 54) + 30;
    if (window.innerWidth < 1025 && mobileBar && mobileBar.offsetHeight > 0) {
      offset += mobileBar.offsetHeight;
    }
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 50) {
      const lastItem = currentTocTargetItems[currentTocTargetItems.length - 1];
      setActiveLink(lastItem.link);
      return;
    }

    let activeItem = currentTocTargetItems[0];
    for (let i = 0; i < currentTocTargetItems.length; i++) {
      const item = currentTocTargetItems[i];
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
    const currentLinks = document.querySelectorAll(".sidebar-toc .toc-link");
    currentLinks.forEach(l => {
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
      if (mobileTocCurrentLabel && activeLink) {
        const text = activeLink.textContent.trim();
        mobileTocCurrentLabel.textContent = text;
        mobileTocCurrentLabel.title = text;
      }
    }
  }

  updateActiveTocItem();
}

/* ==========================================================================
   4. MODAL DE IMAGENS (LIGHTBOX ACESSÍVEL)
   ========================================================================== */

function initImageModal() {
  if (document._imageModalInitialized) return;
  document._imageModalInitialized = true;

  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal || !modalImg || !closeBtn) return;

  let lastActiveElement = null;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".figure-img-wrap, .figure-zoom-btn");
    if (!trigger) return;
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
  if (document._copyButtonsInitialized) return;
  document._copyButtonsInitialized = true;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".code-copy-btn");
    if (!btn) return;
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
