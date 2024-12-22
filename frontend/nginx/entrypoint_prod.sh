#!/bin/bash
envsubst '${SERVER_NAME} ${SERVER_ENV} ${BACKEND_APP_API_URL}' < /etc/nginx/conf.d/default_prod.template > /etc/nginx/conf.d/default_prod.conf
crond -f -L /var/log/cron.log &
exec nginx -g 'daemon off;'