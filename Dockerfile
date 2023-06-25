FROM node:latest
WORKDIR /jaks
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4321
CMD ["node","dist/index.js"]