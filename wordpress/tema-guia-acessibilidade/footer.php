<!-- 6. MODAL DE ZOOM DE IMAGEM (LIGHTBOX ACESSÍVEL) -->
  <div id="image-modal" class="image-modal-overlay" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Visualização ampliada da imagem">
    <div class="image-modal-box">
      <button type="button" id="modal-close-btn" class="image-modal-close-btn" aria-label="Fechar ampliação da imagem">&times;</button>
      <img id="modal-img" class="image-modal-img" src="" alt="">
      <p id="modal-caption" class="image-modal-caption"></p>
    </div>
  </div>

  <!-- 7. BOTÃO FLUTUANTE VOLTAR AO TOPO -->
  <button type="button" id="back-to-top" class="back-to-top-btn" title="Voltar ao topo da página" aria-label="Voltar ao topo da página">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>
  </button>

  <!-- 8. RODAPÉ INSTITUCIONAL PREFEITURA DO RIO -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-brand">
        <h3>Prefeitura da Cidade do Rio de Janeiro</h3>
        <p>
          Subsecretaria de Transformação Digital e Cidades Inteligentes<br>
          Compromisso público com a inclusão, autonomia e cidadania plena de todos os cariocas.
        </p>
        <p>
          Este portal foi desenvolvido em total conformidade com a WCAG 2.2 (Nível AA), o eMAG 3.1 e as normas ABNT NBR 17060 e 17225.
        </p>
      </div>

      <div class="footer-column">
        <h4>Portais e Serviços</h4>
        <ul class="footer-links">
          <li><a href="https://carioca.rio/" target="_blank" rel="noopener noreferrer">Carioca Digital</a></li>
          <li><a href="https://www.1746.rio/" target="_blank" rel="noopener noreferrer">Central 1746</a></li>
          <li><a href="https://transparencia.prefeitura.rio/" target="_blank" rel="noopener noreferrer">Portal da Transparência</a></li>
          <li><a href="https://lgpd.prefeitura.rio/" target="_blank" rel="noopener noreferrer">Privacidade e LGPD</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Acessibilidade &amp; Apoio</h4>
        <ul class="footer-links">
          <li><a href="https://vlibras.gov.br/" target="_blank" rel="noopener noreferrer">VLibras - Língua de Sinais</a></li>
          <li><a href="https://smpd.prefeitura.rio/" target="_blank" rel="noopener noreferrer">Sec. Mun. da Pessoa com Deficiência</a></li>
          <li><a href="https://www.w3c.br/" target="_blank" rel="noopener noreferrer">W3C Brasil</a></li>
          <li><a href="https://webparatodos.com.br/" target="_blank" rel="noopener noreferrer">Movimento Web para Todos</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 Prefeitura da Cidade do Rio de Janeiro. Todos os direitos reservados.</span>
      <span>Desenvolvido com foco no ser humano e na inclusão digital.</span>
    </div>
  </footer>

  <!-- 9. WIDGET OFICIAL DO VLIBRAS INTEGRADO -->
  <div id="vlibras" vw class="enabled" aria-label="Widget de tradução em LIBRAS">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
  <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
  <script>
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
  </script>

  <!-- Script principal do portal (Busca com sugestões em tempo real, TOC, Acessibilidade) -->
  <?php wp_footer(); ?>
</body>
</html>
