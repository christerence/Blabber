FROM node:10
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD ["npm", "run", "server"]; /wait