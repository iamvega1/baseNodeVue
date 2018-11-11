FROM node:8.2.1-alpine

EXPOSE 3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY application/package.json package.json

RUN npm install supervisor -g && npm install && npm cache clean --force

COPY application/. .

ENV MYSQL_HOST changeme
ENV MYSQL_PORT changeme
ENV MYSQL_USER changeme
ENV MYSQL_PASSORD changeme
ENV MYSQL_DB changeme
ENV GOOGLE_CLIENT_ID: changeme
ENV GOOGLE_CLIENT_SECRET: changeme
ENV TOKEN_SECRET: chengeme
ENV SMTP_USERNAME changeme
ENV SMTP_PASSWORD changeme
ENV SMTP_FROM changeme
ENV BASE_URL changeme


CMD ["npm", "start"]