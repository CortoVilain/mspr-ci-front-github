FROM node:11.10.1
COPY . . 
RUN npm install yarn -g
RUN yarn install
RUN yarn build 

FROM nginx
COPY --from=0 dist /usr/share/nginx/html