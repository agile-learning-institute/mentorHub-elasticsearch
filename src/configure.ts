import config from './config/Config';
import ElasticUtils from './utils/ElasticUtils';
import MongoUtils from './utils/MongoUtils';

export class Configurator {
    private elastic: ElasticUtils;
    private mongo: MongoUtils;

    constructor() {
        this.elastic = new ElasticUtils(config.clientOptions);
        this.mongo = new MongoUtils(config.mongoConnectionString);
    }

    public async configure() {
        console.log(await this.elastic.testConnection());
        console.log(await this.elastic.createIndex(config.indexName));
        console.log(await this.elastic.putMapping(config.indexName, config.indexMapping));
        if (config.loadTestData) {
            let testData = await this.mongo.getTestData(config.dbName, config.collections);
            console.log(await this.elastic.indexTestData(config.indexName, testData));
        } else {
            console.log("No test data loaded");
        }
    }
}

// Start the Configuration
(async () => {
    try {
        const configurator = new Configurator();
        await configurator.configure();
        console.log("Processing completed successfully");
    } catch (error) {
        console.log("Exception Occured: ", error);
    }
})();
