FROM node:10
WORKDIR /app
COPY package.json package-lock.json index.js ./
RUN npm install
CMD ["node", "index.js"]