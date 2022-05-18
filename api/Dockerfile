FROM node:14.19.1-alpine

COPY ["package.json", "/opt/api/"]
COPY ["package-lock.json", "/opt/api/"]

WORKDIR /opt/api

RUN npm ci

COPY ["./", "/opt/api/"]

CMD ["npm", "start"]
