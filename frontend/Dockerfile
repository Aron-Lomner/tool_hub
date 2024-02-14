FROM node:current-bullseye

WORKDIR /app

COPY . .

RUN npm i
RUN npx vite build

EXPOSE 80

CMD [ "npm", "run", "preview" ]

