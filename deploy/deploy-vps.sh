#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/geri60saude}"
WEB_ROOT="${WEB_ROOT:-/var/www/geri60saude}"

cd "$APP_DIR"
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build

sudo install -d -o www-data -g www-data "$WEB_ROOT/dist"
sudo rsync -a --delete dist/ "$WEB_ROOT/dist/"
sudo chown -R www-data:www-data "$WEB_ROOT"
sudo nginx -t
sudo systemctl reload nginx

echo "Frontend publicado em $WEB_ROOT/dist e Nginx recarregado na porta 3021."
