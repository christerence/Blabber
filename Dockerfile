FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --retries=12 \
    CMD curl --silent --fail localhost:3000/healthcheck || exit 1
CMD ["npm", "run", "start"];