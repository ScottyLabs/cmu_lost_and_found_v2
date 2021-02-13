FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /usr/src/app
COPY api/ ./api/
RUN cd api && npm install && npm run build

FROM node:14
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY --from=server-build /usr/src/app/api/dist ./
RUN ls

EXPOSE 3080

CMD ["node", "./api.bundle.js"]