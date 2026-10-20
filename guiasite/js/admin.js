/**
 * PAINEL DE ADMINISTRAÇÃO & EDITOR DE CONTEÚDO
 * Prefeitura da Cidade do Rio de Janeiro
 * Guia de Boas Práticas de Acessibilidade Digital
 */

document.addEventListener("DOMContentLoaded", () => {
  const editorCanvas = document.getElementById("editor-canvas");
  const htmlTextarea = document.getElementById("html-textarea");
  const chapterList = document.getElementById("admin-chapter-list");
  const statusDot = document.getElementById("status-dot");
  const statusText = document.getElementById("status-text");
  const toast = document.getElementById("admin-toast");
  const toastMessage = document.getElementById("toast-message");

  let isDirty = false;
  let activeChapterId = "all";
  let autosaveTimer = null;
  let currentSelectionRange = null;

  // --- 1. CARREGAMENTO INICIAL DO CONTEÚDO ---
  async function loadInitialContent() {
    const savedContent = localStorage.getItem("guia_custom_content");
    if (savedContent && savedContent.trim().length > 50) {
      editorCanvas.innerHTML = savedContent;
      htmlTextarea.value = savedContent;
      updateStatus(true, "Conteúdo carregado da memória local");
      refreshChapterIndex();
      return;
    }

    try {
      updateStatus(false, "Carregando conteúdo oficial do guia...");
      const response = await fetch("index.html");
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const mainEl = doc.getElementById("conteudo-principal");

      if (mainEl) {
        editorCanvas.innerHTML = mainEl.innerHTML;
        htmlTextarea.value = mainEl.innerHTML;
        updateStatus(true, "Conteúdo oficial carregado com sucesso");
        refreshChapterIndex();
      } else {
        editorCanvas.innerHTML = "<p>Digite seu conteúdo aqui...</p>";
        htmlTextarea.value = editorCanvas.innerHTML;
      }
    } catch (err) {
      console.warn("Não foi possível carregar index.html via fetch (modo local restrito). Iniciando vazio.", err);
      editorCanvas.innerHTML = "<p>Inicie a edição do conteúdo aqui...</p>";
      htmlTextarea.value = editorCanvas.innerHTML;
      updateStatus(true, "Editor pronto");
    }
  }

  // --- 2. INDEXAÇÃO DOS CAPÍTULOS NA SIDEBAR ---
  function refreshChapterIndex() {
    chapterList.innerHTML = "";

    // Botão "Ver Todo o Guia"
    const allItem = document.createElement("li");
    allItem.className = "admin-chapter-item";
    allItem.innerHTML = `
      <button type="button" class="admin-chapter-btn ${activeChapterId === 'all' ? 'is-active' : ''}" data-chapter="all">
        <span>Todo o Guia</span>
        <span class="admin-chapter-num">Geral</span>
      </button>
    `;
    chapterList.appendChild(allItem);

    const sections = editorCanvas.querySelectorAll(".content-section");
    sections.forEach((sec, idx) => {
      const heading = sec.querySelector(".section-heading");
      const badge = sec.querySelector(".section-badge");
      const title = heading ? heading.textContent.trim() : `Capítulo ${idx + 1}`;
      const badgeText = badge ? badge.textContent.trim() : `Cap. ${idx + 1}`;
      const secId = sec.id || `capitulo-${idx + 1}`;
      if (!sec.id) sec.id = secId;

      const li = document.createElement("li");
      li.className = "admin-chapter-item";
      li.innerHTML = `
        <button type="button" class="admin-chapter-btn ${activeChapterId === secId ? 'is-active' : ''}" data-chapter="${secId}">
          <span style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</span>
          <span class="admin-chapter-num">${badgeText}</span>
        </button>
      `;
      chapterList.appendChild(li);
    });

    // Eventos de clique na sidebar
    chapterList.querySelectorAll(".admin-chapter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-chapter");
        activeChapterId = targetId;
        chapterList.querySelectorAll(".admin-chapter-btn").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        if (targetId === "all") {
          editorCanvas.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const targetEl = editorCanvas.querySelector(`#${targetId}`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            targetEl.classList.remove("target-pulse");
            void targetEl.offsetWidth;
            targetEl.classList.add("target-pulse");
          }
        }
      });
    });
  }

  // --- 3. AUTOSAVE E STATUS ---
  function updateStatus(saved, text) {
    if (saved) {
      statusDot.classList.remove("unsaved");
      statusText.textContent = text || "Alterações salvas localmente";
    } else {
      statusDot.classList.add("unsaved");
      statusText.textContent = text || "Alterações não salvas...";
    }
  }

  function triggerAutosave() {
    isDirty = true;
    updateStatus(false, "Salvando...");
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      saveToStorage();
    }, 800);
  }

  function saveToStorage() {
    const html = editorCanvas.innerHTML;
    localStorage.setItem("guia_custom_content", html);
    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    updateStatus(true, `Salvo localmente às ${timeStr}`);
    isDirty = false;
  }

  editorCanvas.addEventListener("input", () => {
    triggerAutosave();
  });

  // Salva a seleção do cursor antes de abrir modais
  editorCanvas.addEventListener("mouseup", saveSelection);
  editorCanvas.addEventListener("keyup", saveSelection);

  function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      currentSelectionRange = sel.getRangeAt(0);
    }
  }

  function restoreSelection() {
    if (currentSelectionRange) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(currentSelectionRange);
    }
  }

  function insertHtmlAtCursor(html) {
    editorCanvas.focus();
    restoreSelection();
    const sel = window.getSelection();
    if (!sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();
    const el = document.createElement("div");
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    triggerAutosave();
    refreshChapterIndex();
  }

  // --- 4. BARRA DE FERRAMENTAS DO EDITOR (TOOLBAR) ---
  document.querySelectorAll("[data-cmd]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      const val = btn.getAttribute("data-val") || null;
      editorCanvas.focus();
      document.execCommand(cmd, false, val);
      triggerAutosave();
    });
  });

  // Marcação / Destaque de Texto (<mark>)
  const btnMark = document.getElementById("btn-format-mark");
  if (btnMark) {
    btnMark.addEventListener("click", () => {
      const sel = window.getSelection();
      if (!sel.rangeCount || sel.isCollapsed) {
        showToast("Selecione um texto antes de aplicar a marcação");
        return;
      }
      const selectedText = sel.toString();
      insertHtmlAtCursor(`<mark>${selectedText}</mark>`);
    });
  }

  // Dropdowns da Toolbar (Callouts, etc)
  document.querySelectorAll(".dropdown-wrapper").forEach(wrapper => {
    const trigger = wrapper.querySelector(".toolbar-dropdown-btn");
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains("is-open");
      document.querySelectorAll(".dropdown-wrapper").forEach(w => w.classList.remove("is-open"));
      if (!isOpen) wrapper.classList.add("is-open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-wrapper").forEach(w => w.classList.remove("is-open"));
  });

  // Inserção de Callouts
  document.querySelectorAll("[data-callout]").forEach(item => {
    item.addEventListener("click", () => {
      const type = item.getAttribute("data-callout");
      let icon = "";
      let title = "";

      if (type === "wcag") {
        title = "Diretriz WCAG 2.2";
        icon = "📘";
      } else if (type === "law") {
        title = "Legislação & Conformidade (Lei 13.146/15)";
        icon = "⚖️";
      } else if (type === "tip") {
        title = "Dica Prática de Acessibilidade";
        icon = "💡";
      } else if (type === "warning") {
        title = "Atenção / Ponto Crítico";
        icon = "⚠️";
      }

      const html = `
        <div class="callout callout-${type}">
          <div class="callout-title">
            <span aria-hidden="true">${icon}</span>
            <span>${title}</span>
          </div>
          <p>Escreva aqui o texto explicativo do destaque...</p>
        </div>
      `;
      insertHtmlAtCursor(html);
      showToast(`Callout de ${title} inserido`);
    });
  });

  // --- 5. MODAIS DE INSERÇÃO AVANÇADA ---
  function openModal(id) {
    saveSelection();
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("is-active");
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("is-active");
    editorCanvas.focus();
  }

  document.querySelectorAll(".admin-modal-close, [data-modal-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".admin-modal-overlay");
      if (modal) modal.classList.remove("is-active");
    });
  });

  // Inserir Título / Capítulo
  const btnInsertChapter = document.getElementById("btn-insert-chapter");
  if (btnInsertChapter) {
    btnInsertChapter.addEventListener("click", () => openModal("modal-chapter"));
  }

  document.getElementById("form-chapter")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = document.getElementById("chapter-num").value.trim();
    const title = document.getElementById("chapter-title").value.trim();
    const id = document.getElementById("chapter-id").value.trim() || slugify(title);

    const html = `
      <section class="content-section" id="${id}">
        <span class="section-badge">Capítulo ${num}</span>
        <h2 class="section-heading">${title}</h2>
        <p>Inicie o texto deste novo capítulo aqui...</p>
      </section>
    `;
    insertHtmlAtCursor(html);
    closeModal("modal-chapter");
    showToast(`Capítulo "${title}" inserido com sucesso`);
  });

  // Inserir Subtítulo (H3 / H4)
  const btnInsertSubtitle = document.getElementById("btn-insert-subtitle");
  if (btnInsertSubtitle) {
    btnInsertSubtitle.addEventListener("click", () => openModal("modal-subtitle"));
  }

  document.getElementById("form-subtitle")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const level = document.getElementById("subtitle-level").value;
    const title = document.getElementById("subtitle-title").value.trim();
    const id = document.getElementById("subtitle-id").value.trim() || slugify(title);

    let html = "";
    if (level === "h3") {
      html = `
        <article id="${id}">
          <h3 class="article-heading">${title}</h3>
          <p>Conteúdo da seção...</p>
        </article>
      `;
    } else {
      html = `<h4 id="${id}">${title}</h4><p>Conteúdo...</p>`;
    }

    insertHtmlAtCursor(html);
    closeModal("modal-subtitle");
    showToast(`Subtítulo "${title}" inserido`);
  });

  // Inserir Caixa de Código
  const btnInsertCode = document.getElementById("btn-insert-code");
  if (btnInsertCode) {
    btnInsertCode.addEventListener("click", () => openModal("modal-code"));
  }

  document.getElementById("form-code")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const lang = document.getElementById("code-lang").value.trim() || "HTML";
    const snippet = document.getElementById("code-snippet").value;
    const escapedSnippet = escapeHtml(snippet);

    const html = `
      <div class="code-box">
        <div class="code-header">
          <span class="code-lang">${lang}</span>
          <button type="button" class="code-copy-btn" aria-label="Copiar código ${lang}">Copiar</button>
        </div>
        <pre><code class="language-${lang.toLowerCase()}">${escapedSnippet}</code></pre>
      </div>
    `;
    insertHtmlAtCursor(html);
    closeModal("modal-code");
    showToast("Bloco de código inserido");
  });

  // Inserir Imagem / Figura Acessível
  const btnInsertImage = document.getElementById("btn-insert-image");
  if (btnInsertImage) {
    btnInsertImage.addEventListener("click", () => openModal("modal-image"));
  }

  document.getElementById("form-image")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.getElementById("image-url").value.trim();
    const alt = document.getElementById("image-alt").value.trim();
    const caption = document.getElementById("image-caption").value.trim();

    if (!alt) {
      alert("Para conformidade com a WCAG 2.2, o texto alternativo (Alt) é obrigatório.");
      return;
    }

    const html = `
      <figure class="accessible-figure">
        <div class="figure-img-wrap">
          <img src="${url}" alt="${escapeHtml(alt)}" loading="lazy" />
          <button type="button" class="figure-zoom-btn" title="Ampliar imagem" aria-label="Ampliar imagem: ${escapeHtml(alt)}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
        </div>
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>
    `;
    insertHtmlAtCursor(html);
    closeModal("modal-image");
    showToast("Imagem acessível inserida");
  });

  // Inserir Caixa de Arte / Ilustração Reservada
  const btnInsertArt = document.getElementById("btn-insert-art");
  if (btnInsertArt) {
    btnInsertArt.addEventListener("click", () => openModal("modal-art"));
  }

  document.getElementById("form-art")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("art-id").value.trim();
    const title = document.getElementById("art-title").value.trim();
    const desc = document.getElementById("art-desc").value.trim();

    const html = `
      <div class="art-card-wrapper" data-art-id="${id}">
        <div class="art-card-badge">🎨 Arte Reservada &bull; ${id.toUpperCase()}</div>
        <div class="art-card-title">${title}</div>
        <p class="art-card-desc">${desc}</p>
      </div>
    `;
    insertHtmlAtCursor(html);
    closeModal("modal-art");
    showToast(`Caixa de arte ${id} inserida`);
  });

  // Inserir Hiperlink
  const btnInsertLink = document.getElementById("btn-insert-link");
  if (btnInsertLink) {
    btnInsertLink.addEventListener("click", () => {
      saveSelection();
      const sel = window.getSelection();
      const text = sel ? sel.toString() : "";
      if (text) {
        document.getElementById("link-text").value = text;
      }
      openModal("modal-link");
    });
  }

  document.getElementById("form-link")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("link-text").value.trim();
    const url = document.getElementById("link-url").value.trim();
    const newTab = document.getElementById("link-newtab").checked;

    const targetAttr = newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const html = `<a href="${url}"${targetAttr}>${text || url}</a>`;
    insertHtmlAtCursor(html);
    closeModal("modal-link");
    showToast("Link inserido");
  });

  // Inserir Nota de Rodapé & Âncora Bidirecional
  const btnInsertFootnote = document.getElementById("btn-insert-footnote");
  if (btnInsertFootnote) {
    btnInsertFootnote.addEventListener("click", () => {
      // Determina próximo número
      const existingRefs = editorCanvas.querySelectorAll(".footnote-ref");
      const nextNum = existingRefs.length + 1;
      document.getElementById("fn-num").value = nextNum;
      openModal("modal-footnote");
    });
  }

  document.getElementById("form-footnote")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = document.getElementById("fn-num").value.trim();
    const text = document.getElementById("fn-text").value.trim();

    const fnId = `fn${num}`;
    const fnRefId = `fnref${num}`;

    // 1. Insere o sobrescrito no texto
    const refHtml = `<sup class="footnote-ref"><a href="#${fnId}" id="${fnRefId}" aria-describedby="referencias">[${num}]</a></sup>`;
    insertHtmlAtCursor(refHtml);

    // 2. Insere a referência correspondente na lista de referências
    let refList = editorCanvas.querySelector("#referencias ol, ol.footnotes-list");
    if (!refList) {
      let refSec = editorCanvas.querySelector("#referencias");
      if (!refSec) {
        refSec = document.createElement("section");
        refSec.className = "content-section";
        refSec.id = "referencias";
        refSec.innerHTML = `
          <span class="section-badge">Apêndice</span>
          <h2 class="section-heading">Referências</h2>
          <ol class="footnotes-list"></ol>
        `;
        editorCanvas.appendChild(refSec);
      }
      refList = refSec.querySelector("ol");
    }

    if (refList) {
      const li = document.createElement("li");
      li.id = fnId;
      li.innerHTML = `${text} <a href="#${fnRefId}" class="footnote-backref" aria-label="Voltar à referência ${num}">↩</a>`;
      refList.appendChild(li);
    }

    closeModal("modal-footnote");
    showToast(`Nota [${num}] e âncora inseridas com sucesso`);
    triggerAutosave();
  });

  // Inserir Tabela Acessível
  const btnInsertTable = document.getElementById("btn-insert-table");
  if (btnInsertTable) {
    btnInsertTable.addEventListener("click", () => openModal("modal-table"));
  }

  document.getElementById("form-table")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const caption = document.getElementById("table-caption").value.trim();
    const rows = parseInt(document.getElementById("table-rows").value, 10) || 3;
    const cols = parseInt(document.getElementById("table-cols").value, 10) || 3;

    let tableHtml = `<div class="table-responsive"><table class="accessible-table">`;
    if (caption) tableHtml += `<caption>${caption}</caption>`;
    tableHtml += `<thead><tr>`;
    for (let c = 1; c <= cols; c++) {
      tableHtml += `<th scope="col">Coluna ${c}</th>`;
    }
    tableHtml += `</tr></thead><tbody>`;
    for (let r = 1; r <= rows; r++) {
      tableHtml += `<tr>`;
      for (let c = 1; c <= cols; c++) {
        tableHtml += `<td>Dado ${r}.${c}</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table></div>`;

    insertHtmlAtCursor(tableHtml);
    closeModal("modal-table");
    showToast("Tabela acessível inserida");
  });

  // Inserir Card de Estatística
  const btnInsertStat = document.getElementById("btn-insert-stat");
  if (btnInsertStat) {
    btnInsertStat.addEventListener("click", () => openModal("modal-stat"));
  }

  document.getElementById("form-stat")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = document.getElementById("stat-number").value.trim();
    const desc = document.getElementById("stat-desc").value.trim();

    const html = `
      <div class="stat-card">
        <span class="stat-number">${num}</span>
        <span class="stat-label">${desc}</span>
      </div>
    `;
    insertHtmlAtCursor(html);
    closeModal("modal-stat");
    showToast("Card de estatística inserido");
  });

  // --- 6. ALTERNÂNCIA VISUAL / HTML ---
  const tabVisual = document.getElementById("tab-mode-visual");
  const tabHtml = document.getElementById("tab-mode-html");
  const editorPane = document.getElementById("editor-pane");
  const htmlPane = document.getElementById("html-pane");

  if (tabVisual && tabHtml) {
    tabVisual.addEventListener("click", () => {
      tabVisual.classList.add("is-active");
      tabHtml.classList.remove("is-active");
      editorCanvas.innerHTML = htmlTextarea.value;
      editorPane.style.display = "block";
      htmlPane.classList.remove("is-active");
      refreshChapterIndex();
      triggerAutosave();
    });

    tabHtml.addEventListener("click", () => {
      tabHtml.classList.add("is-active");
      tabVisual.classList.remove("is-active");
      htmlTextarea.value = editorCanvas.innerHTML;
      editorPane.style.display = "none";
      htmlPane.classList.add("is-active");
    });

    htmlTextarea.addEventListener("input", () => {
      triggerAutosave();
    });
  }

  // --- 7. AÇÕES GLOBAIS DE SALVAR, EXPORTAR E RESTAURAR ---
  const btnSaveSite = document.getElementById("btn-save-site");
  if (btnSaveSite) {
    btnSaveSite.addEventListener("click", () => {
      saveToStorage();
      showToast("✅ Conteúdo salvo com sucesso no navegador! Abra o site para conferir.");
    });
  }

  // Baixar index.html atualizado completo
  const btnDownloadIndex = document.getElementById("btn-download-index");
  if (btnDownloadIndex) {
    btnDownloadIndex.addEventListener("click", async () => {
      saveToStorage();
      try {
        const response = await fetch("index.html");
        const originalHtml = await response.text();
        const updatedMainContent = editorCanvas.innerHTML;

        // Substitui o conteúdo de <main id="conteudo-principal"> pelo novo
        const mainStartTag = '<main class="main-content" id="conteudo-principal">';
        const mainEndTag = '</main>';

        const startIdx = originalHtml.indexOf(mainStartTag);
        const endIdx = originalHtml.indexOf(mainEndTag, startIdx);

        if (startIdx !== -1 && endIdx !== -1) {
          const newCompleteHtml = originalHtml.slice(0, startIdx + mainStartTag.length) +
            "\n" + updatedMainContent + "\n" +
            originalHtml.slice(endIdx);

          downloadFile("index.html", newCompleteHtml, "text/html;charset=utf-8");
          showToast("⬇️ Arquivo index.html gerado e baixado com sucesso!");
        } else {
          showToast("Erro ao montar index.html. Baixando conteúdo isolado.");
          downloadFile("conteudo-guia.html", updatedMainContent, "text/html;charset=utf-8");
        }
      } catch (err) {
        downloadFile("conteudo-guia.html", editorCanvas.innerHTML, "text/html;charset=utf-8");
        showToast("⬇️ Conteúdo exportado em HTML!");
      }
    });
  }

  // Copiar HTML
  const btnCopyHtml = document.getElementById("btn-copy-html");
  if (btnCopyHtml) {
    btnCopyHtml.addEventListener("click", () => {
      navigator.clipboard.writeText(editorCanvas.innerHTML).then(() => {
        showToast("📋 HTML copiado para a área de transferência!");
      });
    });
  }

  // Restaurar Padrão
  const btnResetDefault = document.getElementById("btn-reset-default");
  if (btnResetDefault) {
    btnResetDefault.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja descartar todas as alterações salvas localmente e restaurar o texto oficial original?")) {
        localStorage.removeItem("guia_custom_content");
        loadInitialContent();
        showToast("Texto oficial restaurado!");
      }
    });
  }

  // Funções Auxiliares
  function slugify(text) {
    return text.toString().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // Inicializa
  loadInitialContent();
});
