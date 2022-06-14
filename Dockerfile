FROM node:16.15-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "dev"]