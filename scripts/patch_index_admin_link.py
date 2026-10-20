with open(r'guiasite\index.html', 'r', encoding='utf-8') as f:
    text = f.read()

target = '<li><a href="https://lgpd.prefeitura.rio/" target="_blank" rel="noopener noreferrer">Privacidade e LGPD</a></li>'
replacement = '<li><a href="https://lgpd.prefeitura.rio/" target="_blank" rel="noopener noreferrer">Privacidade e LGPD</a></li>\n          <li><a href="admin.html">Painel do Editor (Admin)</a></li>'

if target in text:
    text = text.replace(target, replacement, 1)
    with open(r'guiasite\index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print('index.html updated successfully with admin link')
else:
    print('target not found')
