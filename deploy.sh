#!/bin/sh
# Publie le site pro KajiCom sur https://kajicom-pro.expo.app
set -e
cd "$(dirname "$0")"
rm -rf dist && mkdir -p dist
cp index.html dist/ && cp -R assets exemples dist/
# Première fois seulement : crée le projet Expo « kajicom-pro » et note son identifiant dans app.json.
grep -q projectId app.json || npx --yes eas-cli@latest init --non-interactive --force
out=$(npx --yes eas-cli@latest deploy --prod --export-dir dist --non-interactive 2>&1 | tee /dev/stderr)
id=$(printf '%s' "$out" | sed -n 's#.*https://kajicom-pro--\([a-z0-9]*\)\.expo\.app.*#\1#p' | head -1)
# Sans adresse de déploiement, la publication a échoué : on le signale au lieu de faire comme si de rien n'était.
if [ -z "$id" ]; then echo "ÉCHEC : la publication n'a pas abouti." >&2; exit 1; fi
npx --yes eas-cli@latest deploy:alias --prod --id "$id" --non-interactive
