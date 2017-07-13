FROM node:8-alpine

RUN mkdir -p /opt/service && chown -R node: /opt/service
USER node
WORKDIR /opt/service
COPY package.json .
RUN yarn install --production && yarn cache clean
COPY . .

EXPOSE 3000

CMD ["/usr/local/bin/npm", "start"]
