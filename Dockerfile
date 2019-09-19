FROM node:12.10-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

COPY ./ /app/

RUN npm install

CMD [ "npm", "start" ]