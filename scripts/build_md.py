#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Atualizador fiel do GuiaAcessibilidade.md a partir do arquivo exportado do Google Docs.
Preserva 100% do texto original, sem criar tópicos adicionais ou gerar texto artificial.
Apenas remove as definições binárias de base64 no rodapé para manter o arquivo leve.
"""

import re
import sys
import io
from pathlib import Path

# Garante saída UTF-8 no Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

PROJECT_ROOT = Path(__file__).resolve().parent.parent

def find_source_file():
    if len(sys.argv) > 1:
        p = Path(sys.argv[1])
        if p.exists():
            return p
            
    # Busca por qualquer export do Docs (ex: Guia de Boas Práticas de Acessibilidade Digital (2).md)
    files = [f for f in PROJECT_ROOT.glob("Guia de Boas Práticas*.md") if f.is_file()]
    if files:
        files.sort(key=lambda f: f.stat().st_mtime, reverse=True)
        return files[0]
        
    candidates = [
        PROJECT_ROOT / "GuiaAcessibilidade.md"
    ]
    for c in candidates:
        if c.exists():
            return c
    return None

def build_markdown():
    src_file = find_source_file()
    if not src_file:
        print("❌ Nenhum arquivo markdown fonte encontrado!")
        sys.exit(1)

    print(f"📄 Lendo arquivo fonte: {src_file.name}")
    content = src_file.read_text(encoding='utf-8', errors='replace')

    # Remove apenas as linhas de dados binários em base64 do rodapé do arquivo
    content = re.sub(r'^\[image\d+\]:\s*<.*?>\r?\n?', '', content, flags=re.MULTILINE)

    # Limpeza de espaçamentos múltiplos residuais no final
    content = content.rstrip() + "\n"

    out_file = PROJECT_ROOT / "GuiaAcessibilidade.md"
    out_file.write_text(content, encoding='utf-8')
    print(f"✅ GuiaAcessibilidade.md gerado com sucesso! ({len(content)} caracteres - texto idêntico ao original, sem acréscimos)")

if __name__ == "__main__":
    build_markdown()
