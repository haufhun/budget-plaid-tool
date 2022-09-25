FROM node:14.19.1-alpine

WORKDIR /opt/api

COPY ["package.json", "/opt/api/"]
COPY ["package-lock.json", "/opt/api/"]

RUN npm install && npm cache clean --force

COPY ["./", "/opt/api/"]

CMD ["npm", "start"]
