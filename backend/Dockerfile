
FROM node:18


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


COPY . .


EXPOSE 5000

# Start the server
CMD ["npx", "nodemon", "src/server.js"]
