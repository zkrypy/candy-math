#!/bin/sh
# Builds one self-contained page.
#   ./build.sh          -> dist/index.html (private copy, includes src/paper.js if present)
#   ./build.sh public   -> docs/index.html (public GitHub Pages copy, never includes paper.js)
cd "$(dirname "$0")"
MODE="${1:-private}"
if [ "$MODE" = "public" ]; then OUT=docs/index.html; PAPER=""; else OUT=dist/index.html; PAPER=src/paper.js; [ -f "$PAPER" ] || PAPER=""; fi
mkdir -p "$(dirname "$OUT")"
{
  if [ "$MODE" = "public" ]; then printf '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'; fi
  printf '<title>Candy Math</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
  printf '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
  printf '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;700;800;900&display=swap">\n'
  printf '<style>\n'
  if [ "$MODE" = "public" ]; then printf 'body{margin:0}img{max-width:100%%}[hidden]{display:none!important}:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n'; fi
  cat src/style.css; printf '</style>\n'
  printf '<div id="app"></div>\n<script>\n'
  for f in src/logic.js $PAPER src/words.js src/vi.js src/gen.js src/science.js src/howto.js src/app.js; do cat "$f"; printf '\n'; done
  printf '</script>\n'
} > "$OUT"
echo "built $OUT"
