FROM node:6

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /srv/app
WORKDIR /srv/app

ADD package.json /srv/app/
RUN npm install

ADD . /srv/app

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
