FROM node:12.14.1-alpine3.9
RUN apk add curl zip
WORKDIR /usr/src/xray-daemon
RUN curl https://s3.dualstack.us-east-1.amazonaws.com/aws-xray-assets.us-east-1/xray-daemon/aws-xray-daemon-linux-2.x.zip -o ./aws-xray-daemon-linux-2.x.zip
RUN unzip -o aws-xray-daemon-linux-2.x.zip -d .
RUN npm config set unsafe-perm true
RUN npm install pm2 -g
WORKDIR /usr/src/curso-beta-pagamentos
COPY package.json ./
RUN npm install 
COPY . .
RUN node -v
EXPOSE 80
CMD xray-daemon -f /var/log/xray-daemon.log & npm run deploy
