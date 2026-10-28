# Docker image
FROM node:22.13.0

WORKDIR /app

COPY . /app

RUN npm install --no-save
RUN npm run build

ARG PORT=5000
EXPOSE $PORT

ENTRYPOINT ["npm", "run"]