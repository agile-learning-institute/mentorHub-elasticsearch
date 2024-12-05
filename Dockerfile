#Stage 1: build the node app
FROM node:21 AS build

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# create BUILT_AT file
RUN echo $(date) > ./dist/BUILT_AT

# Stage 2: Run the app in a lightweight image
FROM node:21-alpine AS deploy

# Copy files from build
WORKDIR /opt/mentorhub-elasticsearch

COPY --from=build /app/dist .
ENTRYPOINT ["node", "/opt/mentorhub-elasticsearch/bundle.js"]
