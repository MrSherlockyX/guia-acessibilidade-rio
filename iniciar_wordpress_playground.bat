@echo off
chcp 65001 >nul
title WordPress Playground - Guia de Acessibilidade Digital
echo =========================================================================
echo   INICIANDO WORDPRESS PLAYGROUND - GUIA DE ACESSIBILIDADE DIGITAL
echo   Prefeitura da Cidade do Rio de Janeiro
echo =========================================================================
echo.
echo Executando WordPress completo em WebAssembly (sem precisar de MySQL ou PHP local)...
echo O navegador abrira automaticamente em: http://127.0.0.1:9400
echo.
echo Pressione Ctrl+C nesta janela para parar o servidor.
echo =========================================================================
echo.

npx @wp-playground/cli start --path=./wordpress/tema-guia-acessibilidade
pause
