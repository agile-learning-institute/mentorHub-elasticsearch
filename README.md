# mentorhub-elasticsearch

This repository builds a containerized utility that is used to configure the Elasticsearch database used by mentorHub for search services, and optionally load test data harvested from a MongoDB database. 

## DISCLAIMER
Running the Elasticsearch and Kibana backing services as containers will cause you to download quite large docker images. If you are working in a capacity or performance constrained environment you should schedule the downloading of these images accordingly. 

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MentorHub Developer Edition](https://github.com/agile-learning-institute/mentorHub/tree/main/mentorHub-developer-edition) 
- [NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Customize configuration

See [Tsconfig Reference](https://www.typescriptlang.org/tsconfig)

## Contributing
The `./src/configure.ts` script is the entrypoint for this utility. 

### Seperation of Concerns
The `./src/config` folder contains runtime configuration management code. The `./src/utils` folder contains mongodb and elasticsearch IO functions. 

### Workflow
You should do all work in a feature branch, and when you are ready to have your code deployed to the cloud open a pull request against that feature branch. Do not open a pull request without first building and testing the containers locally.

## Build 
To build code for production deployment
```bash
npm run build
```

## Testing changes locally
To start the backing service and run the script locally use this script.
```bash
npm run start
```
NOTE: This command does a ``mh down`` to initilize the docker environment before starting the elasticsearch database with kibana.

## Testing changes without backing services
To run the script locally without starting any backing services use this script.
```bash
npm run local
```

## Build and run the container
Use the following command to build and run the container with backing services. 
```bash
npm run container
```

## Test the output
Use this command to test the output
```bash
npm run test
```

## Using Kibana to verify configuration
The docker compose file always starts Kibana along with ElasticSearch. You can use [the Kibana dashboard](http://localhost:5601). Choose `Dev Tools` from the hamburger menu, to run queries or review configurations of the Elasticsearch database. Here are a few handy elasticsearch queries to run in Kibana:

### List Indexes
```
GET /_cat/indices
```

### Get all indexed documents
```
GET mentorhub/_search
```

### Delete the index and all data
```
DELETE /mentorhub
```

## Elasticsearch docker reference
[this guide](hhttps://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) provides valuable configuration and troubleshooting guides for the elasticsearch container.

