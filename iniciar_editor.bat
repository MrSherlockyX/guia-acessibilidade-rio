@echo off
chcp 65001 >nul
title Servidor do Guia de Acessibilidade - Prefeitura do Rio
echo =========================================================================
echo   INICIANDO PAINEL DO EDITOR - GUIA DE ACESSIBILIDADE DIGITAL
echo   Prefeitura da Cidade do Rio de Janeiro
echo =========================================================================
echo.
echo Iniciando servidor local em tempo real...
echo O Painel de Administracao abrira no seu navegador em: http://localhost:8000/admin.html
echo.
echo Qualquer alteracao salva no editor atualizara automaticamente o index.html!
echo =========================================================================
echo.

if exist "%LOCALAPPDATA%\Python\bin\python.exe" (
    "%LOCALAPPDATA%\Python\bin\python.exe" scripts\servidor_editor.py
) else (
    python scripts\servidor_editor.py
)
if errorlevel 1 (
    py -3 scripts\servidor_editor.py
)
pause
