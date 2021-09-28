FROM node:14.16-alpine

RUN mkdir -p /work/frontend
WORKDIR /work/frontend

COPY package*.json ./
RUN yarn install
COPY . .

CMD [ "yarn", "start" ]
