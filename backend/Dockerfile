FROM node:20
WORKDIR /app
COPY ./package.json ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
RUN npm install --only=${NODE_ENV}

COPY . ./
EXPOSE 5000
CMD ["sh", "-c", "npm run $RUN_SCRIPT"]
