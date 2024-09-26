# mentorhub-elasticsearch

This repository builds a containerized utility that is used to configure the Elasticsearch database used by mentorHub for search services, and optionally load test data. 

[Here](https://github.com/orgs/agile-learning-institute/repositories?q=mentorhub-&type=all&sort=name) are all of the repositories in the [mentorHub](https://github.com/agile-learning-institute/mentorhub/tree/main) system

## DISCLAIMER
Running the Elasticsearch and Kibana backing services as containers will cause you to download quite large docker images. If you are working in a capacity or performance constrained environment you should schedule the downloading of these images accordingly. 

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MentorHub Developer Edition](https://github.com/agile-learning-institute/mentorHub/tree/main/mentorHub-developer-edition) - to easily run the containers locally
- [NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Customize configuration

See [Tsconfig Reference](https://www.typescriptlang.org/tsconfig)

## Contributing
The typescript files found in `./src/searchinit/` are used to grab test data from a `test-data.json` and perform the necessary data transformations before indexing the test data. There is a CLI tool at```./src/searchinit/elasticsearch-test.sh``` that can be used to run various tests on your elasticsearch container.

You should do all work in a feature branch, and when you are ready to have your code deployed to the cloud open a pull request against that feature branch. Do not open a pull request without first building and testing the containers locally.

## Build 
To build code for deployment
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

## Harvest test data
Use this command to connect to the backing mongodb and harvest test data
```bash
npm run import
```

## Test the output
Use this command to test the output
```bash
npm run test
```

## Using Kibana to verify configuration
The docker compose file always starts Kibana along with ElasticSearch. You can use [the Kibana dashboard](http://localhost:5601) to run queries or review configurations of the Elasticsearch database.

## Elasticsearch docker reference
[this guide](hhttps://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) provides valuable configuration and troubleshooting guides.

