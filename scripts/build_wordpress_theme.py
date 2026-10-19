import os
import re

THEME_DIR = r"wordpress\tema-guia-acessibilidade"
os.makedirs(THEME_DIR, exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "fonts"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "js"), exist_ok=True)
os.makedirs(os.path.join(THEME_DIR, "assets", "images"), exist_ok=True)

# 1. STYLE.CSS
with open(r"guiasite\css\style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

# Replace font relative path: ../fonts/ -> fonts/
css_content = css_content.replace("url('../fonts/", "url('fonts/")

theme_header = """/*
Theme Name: Guia de Boas Praticas de Acessibilidade Digital - Prefeitura do Rio
Theme URI: https://github.com/MrSherlockyX/guia-acessibilidade-rio
Author: Prefeitura da Cidade do Rio de Janeiro
Author URI: https://prefeitura.rio/
Description: Tema oficial acessivel em total conformidade com a WCAG 2.2 (Niveis AA e AAA), o eMAG 3.1 e as normas ABNT NBR 17060 e 17225.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: MIT
License URI: https://opensource.org/licenses/MIT
Text Domain: guia-acessibilidade-rio
Tags: accessibility, government, accessible, dark-mode, responsive-layout, translation-ready
*/

"""

with open(os.path.join(THEME_DIR, "style.css"), "w", encoding="utf-8") as f:
    f.write(theme_header + css_content)
print("style.css generated.")

# 2. FUNCTIONS.PHP
functions_php = """<?php
/**
 * Funcoes e definicoes do Tema Guia de Acessibilidade Digital - Prefeitura do Rio
 * Conforme WCAG 2.2 (AA/AAA), eMAG 3.1 e ABNT NBR 17060 / 17225.
 */

if (!defined('ABSPATH')) {
    exit; // Seguranca contra acesso direto
}

function guia_acessibilidade_setup() {
    // Suporte a tag de titulo gerenciada pelo WordPress
    add_theme_support('title-tag');

    // Suporte a imagens destacadas
    add_theme_support('post-thumbnails');

    // Suporte a HTML5 semantico
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Suporte a embeds responsivos
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'guia_acessibilidade_setup');

function guia_acessibilidade_scripts() {
    // Fontes Google: DM Sans e Roboto
    wp_enqueue_style(
        'guia-google-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Roboto:ital,wght@0,300..700;1,300..700&display=swap',
        array(),
        null
    );

    // Folha de estilos principal do tema
    wp_enqueue_style(
        'guia-main-style',
        get_stylesheet_uri(),
        array('guia-google-fonts'),
        '1.0.0'
    );

    // Script interativo vanilla JS (Toolbar acessivel, TOC, Scrollspy, Modal de Imagens, Busca)
    wp_enqueue_script(
        'guia-main-script',
        get_template_directory_uri() . '/js/app.js',
        array(),
        '1.0.0',
        array('in_footer' => true, 'strategy' => 'defer')
    );
}
add_action('wp_enqueue_scripts', 'guia_acessibilidade_scripts');

/**
 * Remove classes desnecessarias do body que possam colidir com nossos tokens
 */
function guia_acessibilidade_body_classes($classes) {
    return $classes;
}
add_filter('body_class', 'guia_acessibilidade_body_classes');
"""

with open(os.path.join(THEME_DIR, "functions.php"), "w", encoding="utf-8") as f:
    f.write(functions_php)
print("functions.php generated.")

# 3. READ guiasite/index.html to slice parts
with open(r"guiasite\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Locate boundaries
# 1. Header: from beginning up to <!-- MÁSCARA ESCURA (BACKDROP) PARA O SUMÁRIO NO MOBILE -->
backdrop_marker = '<!-- MÁSCARA ESCURA (BACKDROP) PARA O SUMÁRIO NO MOBILE -->'
if backdrop_marker not in html:
    backdrop_marker = '<div class="sidebar-toc-backdrop"'

main_marker = '<main class="main-content" id="conteudo-principal">'
modal_marker = '<!-- 6. MODAL DE ZOOM DE IMAGEM (LIGHTBOX ACESSÍVEL) -->'
if modal_marker not in html:
    modal_marker = '<div id="image-modal"'

pos_backdrop = html.find(backdrop_marker)
pos_main = html.find(main_marker)
pos_modal = html.find(modal_marker)

header_part = html[:pos_backdrop]
sidebar_part = html[pos_backdrop:pos_main]
main_content_part = html[pos_main:pos_modal]
footer_part = html[pos_modal:]

# If main_content_part ends with </main>\s*</div>, strip </main>\s*</div> from it
# because front-page.php will close them cleanly
main_content_part = re.sub(r'</main>\s*</div>\s*$', '', main_content_part.strip())


# Clean header_part for WordPress:
# Replace <html lang="pt-BR"> with <html <?php language_attributes(); ?>>
header_part = re.sub(r'<html\s+lang="pt-BR">', '<html <?php language_attributes(); ?>>', header_part)

# Replace <head>...</head> static links with <?php wp_head(); ?>
# We keep title, meta viewport, charset
head_replacement = """<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Guia oficial de boas praticas e diretrizes de acessibilidade digital da Prefeitura da Cidade do Rio de Janeiro.">
  <meta name="theme-color" content="#002B49">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>"""

header_part = re.sub(r'<head>.*?</head>\s*<body>', head_replacement, header_part, flags=re.DOTALL)

# Replace static image paths with get_template_directory_uri()
header_part = re.sub(
    r'src="assets/images/([^"]+)"',
    r'src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/\g<1>"',
    header_part
)

with open(os.path.join(THEME_DIR, "header.php"), "w", encoding="utf-8") as f:
    f.write(header_part)
print("header.php generated.")

# Clean sidebar_part
with open(os.path.join(THEME_DIR, "sidebar.php"), "w", encoding="utf-8") as f:
    f.write(sidebar_part)
print("sidebar.php generated.")

# Clean footer_part:
# Replace <script src="js/app.js"></script> and closing tags with <?php wp_footer(); ?>
footer_part = re.sub(r'<script\s+src="js/app\.js"></script>\s*</body>\s*</html>', '<?php wp_footer(); ?>\n</body>\n</html>', footer_part)

with open(os.path.join(THEME_DIR, "footer.php"), "w", encoding="utf-8") as f:
    f.write(footer_part)
print("footer.php generated.")

# front-page.php
front_page = """<?php
/**
 * Template Name: Pagina do Guia de Acessibilidade
 * Template da pagina inicial do Guia de Boas Praticas de Acessibilidade Digital
 */

get_header();
get_sidebar();
?>

""" + main_content_part + """
  </main>
  </div> <!-- /.main-wrapper -->

<?php
get_footer();
"""

with open(os.path.join(THEME_DIR, "front-page.php"), "w", encoding="utf-8") as f:
    f.write(front_page)
print("front-page.php generated.")

# index.php (fallback)
index_php = """<?php
/**
 * Template principal de fallback
 */

get_header();
get_sidebar();
?>

""" + main_content_part + """
  </main>
  </div> <!-- /.main-wrapper -->

<?php
get_footer();
"""

with open(os.path.join(THEME_DIR, "index.php"), "w", encoding="utf-8") as f:
    f.write(index_php)
print("index.php generated.")
