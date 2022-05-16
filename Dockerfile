FROM node:16.14.0
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:dcp

### STAGE 2: Run ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/dcp /usr/share/nginx/html

EXPOSE 80