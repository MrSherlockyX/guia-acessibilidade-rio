<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Guia oficial de boas praticas e diretrizes de acessibilidade digital da Prefeitura da Cidade do Rio de Janeiro.">
  <meta name="theme-color" content="#002B49">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <!-- 1. LINKS DE ATALHO DE ACESSIBILIDADE (SKIP LINKS - WCAG 2.4.1) -->
  <nav class="skip-links" aria-label="Atalhos de acessibilidade">
    <a href="#conteudo-principal" class="skip-link">Ir para o conteúdo principal [Alt + 1]</a>
    <a href="#navegacao-guia" class="skip-link">Ir para o sumário do guia [Alt + 2]</a>
    <a href="#search-input" class="skip-link">Ir para a barra de pesquisa [Alt + 3]</a>
  </nav>

  <!-- Barra de progresso de leitura no topo -->
  <div id="reading-progress-bar" aria-hidden="true"></div>

  <!-- 2. BARRA DE TOPO INSTITUCIONAL (PREFEITURA DO RIO) -->
  <header class="topbar-prefeitura" role="region" aria-label="Portais da Prefeitura do Rio de Janeiro">
    <div class="topbar-container">
      <ul class="topbar-portal-links">
        <li>
          <a class="topbar-portal-link" href="https://prefeitura.rio/" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>
            Prefeitura.rio
          </a>
        </li>
        <li>
          <a class="topbar-portal-link" href="https://carioca.rio/" target="_blank" rel="noopener noreferrer">
            Carioca Digital
          </a>
        </li>
        <li>
          <a class="topbar-portal-link" href="https://www.1746.rio/" target="_blank" rel="noopener noreferrer">
            Central 1746
          </a>
        </li>
        <li>
          <a class="topbar-portal-link" href="https://transparencia.prefeitura.rio/" target="_blank" rel="noopener noreferrer">
            Transparência
          </a>
        </li>
        <li>
          <a class="topbar-portal-link" href="https://lgpd.prefeitura.rio/" target="_blank" rel="noopener noreferrer">
            LGPD
          </a>
        </li>
      </ul>

      <ul class="topbar-social-links" aria-label="Redes sociais oficiais da Prefeitura">
        <li>
          <a class="topbar-social-link" href="https://twitter.com/Prefeitura_Rio" target="_blank" rel="noopener noreferrer" aria-label="X antigo Twitter da Prefeitura do Rio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </li>
        <li>
          <a class="topbar-social-link" href="https://www.facebook.com/PrefeituradoRio" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Prefeitura do Rio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </li>
        <li>
          <a class="topbar-social-link" href="https://www.instagram.com/prefeitura_rio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Prefeitura do Rio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </li>
        <li>
          <a class="topbar-social-link" href="https://www.youtube.com/prefeiturario" target="_blank" rel="noopener noreferrer" aria-label="YouTube da Prefeitura do Rio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </li>
      </ul>
    </div>
  </header>

  <!-- 3. HEADER PRINCIPAL / HERO DO GUIA -->
  <header class="site-header" role="banner">
    <div class="header-container">
      <div class="header-brand">
        <span class="brand-badge">Governo Digital</span>
        <span class="brand-subsecdigital">Prefeitura da Cidade do Rio de Janeiro &bull; Subsecretaria de Transformação Digital e Cidades Inteligentes</span>
      </div>

      <div class="header-title-wrap">
        <h1>Guia de Boas Práticas de <span class="highlight-cyan">Acessibilidade Digital</span></h1>
        <p class="header-subtitle">
          Diretrizes, critérios técnicos e orientações práticas para a construção e adequação de portais públicos acessíveis, autônomos e inclusivos a todos os cidadãos cariocas.
        </p>
      </div>

      <!-- BARRA DE PESQUISA COM SUGESTÕES EM TEMPO REAL (AUTOCOMPLETE) -->
      <section class="search-section" role="search" aria-label="Pesquisar no guia">
        <div class="search-input-wrapper">
          <span class="search-icon-left" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>

          <input
            type="text"
            id="search-input"
            class="search-input"
            placeholder="Digite para pesquisar (ex: contraste, alt, teclado, libras, censo)..."
            aria-label="Pesquisar critérios e tópicos no Guia de Acessibilidade"
            autocomplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-controls="suggestions-list"
          />

          <span class="search-shortcut-badge" aria-hidden="true">Ctrl + K</span>

          <button type="button" id="search-clear-btn" class="search-clear-btn" aria-label="Limpar pesquisa">
            &times;
          </button>
        </div>

        <!-- DROPDOWN DE SUGESTÕES INSTANTÂNEAS -->
        <div id="search-suggestions" class="search-suggestions-dropdown" aria-label="Sugestões de pesquisa">
          <div class="suggestions-header">
            <span>Sugestões Encontradas</span>
            <span id="suggestions-count" class="suggestions-count-badge">0</span>
          </div>
          <ul id="suggestions-list" class="suggestions-list" role="listbox">
            <!-- Itens inseridos dinamicamente pelo JavaScript conforme a digitação -->
          </ul>
        </div>

        <!-- Anunciador acessível para leitores de tela -->
        <div id="search-live-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
      </section>

      <!-- MASCOTE ROBOZINHO EMERGINDO DA BASE DO BANNER -->
      <div class="header-mascot-wrap" aria-hidden="true">
        <img
          src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/Robozin.png"
          alt=""
          class="header-mascot-img"
          width="330"
          height="312"
        />
      </div>
    </div>
  </header>

  <!-- 4. TOOLBAR DE ACESSIBILIDADE FIXA NO TOPO -->
  <aside class="a11y-toolbar" role="region" aria-label="Ferramentas de acessibilidade">
    <div class="a11y-toolbar-inner">
      <span class="a11y-toolbar-label">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.24l1.41 1.41L9 10.07V21h2v-6h2v6h2V10.07l3.59 3.59L20 12.24l-4.11-4.13z"/></svg>
        Acessibilidade:
      </span>

      <div class="a11y-tools-group">
        <button type="button" class="a11y-btn" id="btn-font-increase" title="Aumentar tamanho do texto" aria-label="Aumentar tamanho do texto">
          A+
        </button>
        <button type="button" class="a11y-btn" id="btn-font-decrease" title="Diminuir tamanho do texto" aria-label="Diminuir tamanho do texto">
          A-
        </button>
        <button type="button" class="a11y-btn" id="btn-contrast-high" title="Alternar alto contraste" aria-pressed="false">
          Alto Contraste
        </button>
        <button type="button" class="a11y-btn" id="btn-dark-mode" title="Alternar modo escuro" aria-pressed="false">
          Modo Escuro
        </button>
        <button type="button" class="a11y-btn" id="btn-dyslexia" title="Alternar fonte para dislexia (OpenDyslexic)" aria-pressed="false">
          Fonte Dislexia
        </button>
        <button type="button" class="a11y-btn" id="btn-spaced-text" title="Alternar espaçamento expandido de texto (WCAG)" aria-pressed="false">
          Espaçamento
        </button>
        <button type="button" class="a11y-btn" id="btn-underline-links" title="Sublinhar todos os links" aria-pressed="false">
          Sublinhar Links
        </button>
        <button type="button" class="a11y-btn a11y-btn-reset" id="btn-a11y-reset" title="Redefinir ajustes visuais">
          Redefinir
        </button>
      </div>
    </div>
  </aside>

  <!-- 5. ESTRUTURA PRINCIPAL: SUMÁRIO HIERÁRQUICO + CONTEÚDO -->
  <div class="main-wrapper">

    <!-- BARRA STICKY DO ÍNDICE PARA DISPOSITIVOS MÓVEIS (MOBILE-FIRST) -->
    <div class="mobile-toc-bar" id="mobile-toc-bar">
      <button
        type="button"
        class="mobile-toc-toggle-btn"
        id="mobile-toc-toggle"
        aria-expanded="false"
        aria-controls="navegacao-guia"
        aria-label="Abrir sumário do guia"
      >
        <span class="mobile-toc-btn-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          <span class="mobile-toc-title-text">Índice do Guia</span>
        </span>
        <span class="mobile-toc-badge" id="mobile-toc-current-label">1. Introdução</span>
      </button>
    </div>

    