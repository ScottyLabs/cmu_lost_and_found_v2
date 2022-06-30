# Also see cloudbuild.yaml
FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY package.json .
COPY .eslintrc.js .
COPY .prettierrc  .
COPY client/ ./client/
RUN npm install
WORKDIR /usr/src/app/client
RUN npm install && npm run build

FROM node:14 AS server-build
WORKDIR /usr/src/app
COPY package.json .
COPY .eslintrc.js .
COPY .prettierrc  .
COPY api/ ./api/
RUN npm install
WORKDIR /usr/src/app/api
RUN npm install && npm run build

FROM node:14
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY --from=server-build /usr/src/app/api/dist ./
RUN ls

EXPOSE 3080

CMD ["node", "./api.bundle.js"]