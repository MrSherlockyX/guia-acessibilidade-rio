@echo off
chcp 65001 >nul
title Atualizador do Guia de Acessibilidade Digital - Prefeitura do Rio

echo =========================================================================
echo    🏛️  ATUALIZADOR DO GUIA DE ACESSIBILIDADE DIGITAL - PREFEITURA DO RIO
echo =========================================================================
echo.
echo Este assistente converte automaticamente o arquivo GuiaAcessibilidade.md
echo exportado do Google Docs para a estrutura completa do portal (guiasite).
echo.

if not exist "GuiaAcessibilidade.md" (
    echo [ERRO] O arquivo GuiaAcessibilidade.md não foi encontrado nesta pasta!
    echo Copie o arquivo markdown exportado para esta pasta e tente novamente.
    echo.
    pause
    exit /b 1
)

echo [1/3] Executando o conversor de Markdown...
python scripts\converter.py "GuiaAcessibilidade.md"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao processar o arquivo markdown.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Conversão concluída com sucesso!
echo Os arquivos guiasite\index.html e guiasite\js\app.js foram atualizados.
echo.

set /p PUSH_CHOICE="Deseja enviar as alterações para o GitHub agora? (S/N): "

if /i "%PUSH_CHOICE%"=="S" (
    echo.
    echo [3/3] Enviando atualizações para o repositório GitHub...
    git add guiasite/index.html guiasite/js/app.js guiasite/assets/images/* GuiaAcessibilidade.md
    git commit -m "docs: atualizar textos e estrutura do guia a partir do Google Docs"
    git push origin main
    echo.
    echo [OK] Repositório e GitHub Pages atualizados com sucesso!
) else (
    echo.
    echo [OK] Arquivos atualizados localmente. Envio para o GitHub ignorado.
)

echo.
echo =========================================================================
echo    Processo finalizado! Pressione qualquer tecla para sair.
echo =========================================================================
pause >nul
