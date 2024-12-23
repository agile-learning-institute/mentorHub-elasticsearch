import Config from './config/Config';
import ElasticUtils from './utils/ElasticUtils';
import MongoUtils from './utils/MongoUtils';

export class Configurator {
    private config: Config;
    private elastic: ElasticUtils;
    private mongo: MongoUtils;

    constructor() {
        this.config = Config.getInstance();
        this.elastic = new ElasticUtils(this.config.ELASTIC_CLIENT_OPTIONS);
        this.mongo = new MongoUtils(this.config.MONGO_CONNECTION_STRING);
    }

    public async configure() {
        const collections = [
            this.config.CURRICULUM_COLLECTION_NAME, 
            this.config.ENCOUNTERS_COLLECTION_NAME,
            this.config.PARTNERS_COLLECTION_NAME,
            this.config.PEOPLE_COLLECTION_NAME,
            this.config.PATHS_COLLECTION_NAME,
            this.config.PLANS_COLLECTION_NAME,
            this.config.RATINGS_COLLECTION_NAME,
            this.config.ENUMERATORS_COLLECTION_NAME,
            this.config.TOPICS_COLLECTION_NAME
        ];
        console.log(await this.elastic.testConnection());
        console.log(await this.elastic.createIndex(this.config.ELASTIC_INDEX_NAME));
        // console.log(await this.elastic.putMapping(this.config.ELASTIC_INDEX_NAME, this.config.ELASTIC_MAPPING));

        const testData = await this.mongo.getTestData(this.config.MONGO_DB_NAME, collections);
        const results = await this.elastic.indexTestData(this.config.ELASTIC_INDEX_NAME, testData);
        console.log(`Configuration Complete! ${results}`);        
    }
}

// Start the Configuration
(async () => {
    try {
        const configurator = new Configurator();
        await configurator.configure();
        console.log("Processing completed successfully");
        process.exit(0);
    } catch (error) {
        console.log("Exception Occurred: ", error);
        process.exit(1);
    }
})();
