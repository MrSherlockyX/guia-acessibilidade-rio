<?php
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
