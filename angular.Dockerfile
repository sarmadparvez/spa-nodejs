FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./dist/apps/angular .
