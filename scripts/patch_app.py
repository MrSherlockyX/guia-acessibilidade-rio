import re

with open(r'guiasite\js\app.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = 'initSearchAutocomplete();'
replacement = 'loadCustomContentIfPresent();\n  initSearchAutocomplete();'

banner_fn = '''
/* --- CARREGAMENTO DE CONTEUDO EDITADO NO PAINEL ADMIN (SE EXISTIR) --- */
function loadCustomContentIfPresent() {
  const customContent = localStorage.getItem("guia_custom_content");
  const mainEl = document.getElementById("conteudo-principal");
  if (customContent && mainEl && customContent.trim().length > 50) {
    const banner = `
      <div class="admin-preview-banner" role="status">
        <div class="admin-preview-banner-inner">
          <span>📝 <strong>Modo Editor Local:</strong> Exibindo versao modificada no Painel Admin.</span>
          <div class="admin-preview-banner-actions">
            <a href="admin.html" class="admin-banner-link">Abrir Editor</a>
            <button type="button" id="btn-revert-local-preview" class="admin-banner-btn">Restaurar Oficial</button>
          </div>
        </div>
      </div>
    `;
    mainEl.innerHTML = banner + customContent;

    const revertBtn = document.getElementById("btn-revert-local-preview");
    if (revertBtn) {
      revertBtn.addEventListener("click", () => {
        if (confirm("Deseja descartar a versao editada localmente e voltar ao conteudo original publicado?")) {
          localStorage.removeItem("guia_custom_content");
          window.location.reload();
        }
      });
    }
  }
}
'''

content = content.replace(target, replacement, 1)

# Append banner_fn after the first DOMContentLoaded block
dom_pattern = re.compile(r'(initReadingProgress\(\);\s*\}\);)')
content = dom_pattern.sub(r'\1\n' + banner_fn, content, count=1)

with open(r'guiasite\js\app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("guiasite/js/app.js patched successfully!")
