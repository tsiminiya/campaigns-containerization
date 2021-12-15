FROM campaigns-node:v16

RUN mkdir -p /usr/src

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD [ "npm", "start" ]
