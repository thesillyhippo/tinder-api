FROM node:10.12.0-alpine
WORKDIR /home/nodejs/app
ENV NODE_ENV prod
COPY package*.json ./
RUN npm install --only=production
RUN apk --no-cache add curl
EXPOSE 8000
COPY . ./
CMD ["node", "index.js"]