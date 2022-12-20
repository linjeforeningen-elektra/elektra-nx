FROM node:alpine3.16

WORKDIR /app

COPY ./dist/apps/api .
COPY ./yarn.lock .

RUN yarn
# RUN npm install class-transformer class-validator reflect-metadata tslib rxjs @nestjs/platform-express

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "main.js"]

