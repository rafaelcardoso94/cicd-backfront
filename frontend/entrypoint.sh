#!/bin/sh
set -e

echo "Substituindo variáveis de ambiente no index.html"
envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.temp.html
mv /usr/share/nginx/html/index.temp.html /usr/share/nginx/html/index.html

exec "$@"