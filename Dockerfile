# Tacter docker image
FROM node:22.9.0

WORKDIR /app

COPY . /app

RUN npm install --no-save
RUN npm run build

ARG PORT=5000
EXPOSE $PORT

ARG START_SCRIPT=start:core:server

ENTRYPOINT ["npm", "run"]

CMD [ "$START_SCRIPT" ]