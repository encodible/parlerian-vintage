FROM nginx:1.17.6-alpine
LABEL maintainer="Kent Bull <kent@veti.io>"

COPY dist/ /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

