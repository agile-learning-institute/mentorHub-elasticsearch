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
            throw new Error('Did not receive response from elasticsearch server');
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
        let indexedCount = 0;
        let countCreated = 0;
        let countUpdated = 0;
        let countNoop = 0;
        for (const theDoc of testData) {
            const docId = `${theDoc.collection_name}_${theDoc.collection_id}`;
            const response = await this.elasticSearchClient.update({
                index: indexName, 
                id: docId,
                doc: theDoc,
                doc_as_upsert: true
            });
            indexedCount++;
            if (!response) {
                throw new Error(`Indexing Error on item ${indexedCount}, doc: ${JSON.stringify(theDoc)}, reply: ${JSON.stringify(response)}`);
            }
            if (response.result == "updated") {
                countUpdated++;
            } else if (response.result == "created") {
                countCreated++;
            } else if (response.result == "noop") {
                countNoop++;
            }
        }
        return `Processing Created ${countCreated} documents, Updated ${countUpdated} documents, ${countNoop} Noop - Total: ${indexedCount}`;
    }

    public async dropIndex(indexName: string) {
        if (await this.elasticSearchClient.indices.delete({index: indexName})) {
            return `Index ${indexName} removed`;
        } else {
            throw new Error('Did not receive response from elasticsearch server');
        }
    }
}
