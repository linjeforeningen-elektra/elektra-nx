FROM node:alpine3.16 as base

WORKDIR /app

COPY ./dist/apps/web ./dist/apps/web

CMD ["node", "dist/apps/web/server/main.js"]
