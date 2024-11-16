# Tacter docker image
FROM node:22.9.0

WORKDIR /app

COPY . /app

RUN npm install --no-save
RUN npm run build

EXPOSE 5000

ENTRYPOINT ["npm", "run"]
CMD [ "start:core:server" ]
