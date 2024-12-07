import { Client } from "@elastic/elasticsearch";

export default class ElasticUtils {
    private elasticSearchClient: Client;

    constructor(clientOptions: any) {
        this.elasticSearchClient = new Client(clientOptions)
        return;
    }

    public async testConnection() {
        if (await this.elasticSearchClient.ping()) {
            return 'Elasticsearch server is reachable';
        } else {
            throw new Error('Did not recieve response from elasticsearch server');
        }
    }

    public async createIndex(indexName: string): Promise<string> {
        const indexExists = await this.elasticSearchClient.indices.exists({
            index: indexName
        });

        if (!indexExists) {
            await this.elasticSearchClient.indices.create({
                index: indexName
            });
            return `Index ${indexName} created`;
        } else {
            return `Index ${indexName} exists!`;
        }
    }
    
    public async putMapping(indexName: string, indexMapping: any) {
        // Create/update if there's mapping for the data
        const response = await this.elasticSearchClient.indices.putMapping({index: indexName, body: indexMapping});

        if (response && response.acknowledged === false) {
            throw new Error("Failed to create/update mapping:" + response);
        }

        return `Mapping for ${indexName} successfully put`;
    }

    public async indexTestData(indexName: string, testData: Array<any>) {
        // Index the test data
        let errors = [];
        let count = 0;
        for (const theDoc of testData) {
            const response = await this.elasticSearchClient.index({index: indexName, document: theDoc});
            count++;
            if (response && response.result != "created") {
                console.log(`Indexing Error on item ${count}, doc: ${theDoc}, reply: ${response}`);
            }
        }
        return `Test Data Processed ${count} records, with ${errors.length} errors`
    }

    public async dropIndex(indexName: string) {
        if (await this.elasticSearchClient.indices.delete({index: indexName})) {
            return `Index ${indexName} removed`;
        } else {
            throw new Error('Did not recieve response from elasticsearch server');
        }
    }
}
