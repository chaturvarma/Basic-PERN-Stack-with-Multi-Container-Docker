#!/bin/sh
envsubst '${SERVER_NAME} ${BACKEND_APP_API_URL}' < /etc/nginx/conf.d/default_dev.template > /etc/nginx/conf.d/default_dev.conf
crond -f -L /var/log/cron.log &
exec nginx -g "daemon off;"