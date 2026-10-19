<?php
$theme_files = [
    'wordpress/tema-guia-acessibilidade/functions.php',
    'wordpress/tema-guia-acessibilidade/header.php',
    'wordpress/tema-guia-acessibilidade/sidebar.php',
    'wordpress/tema-guia-acessibilidade/front-page.php',
    'wordpress/tema-guia-acessibilidade/footer.php',
    'wordpress/tema-guia-acessibilidade/index.php',
];

echo "Checking PHP syntax for theme files...\n";

foreach ($theme_files as $file) {
    if (!file_exists($file)) {
        echo "ERROR: File not found: $file\n";
        continue;
    }
    $code = file_get_contents($file);
    // Use token_get_all to ensure token parsing works
    try {
        $tokens = token_get_all($code, TOKEN_PARSE);
        echo "OK: $file (" . count($tokens) . " tokens parsed successfully)\n";
    } catch (\Throwable $e) {
        echo "SYNTAX ERROR in $file: " . $e->getMessage() . "\n";
    }
}
echo "Syntax check complete!\n";
