/**
 * Class Config: This Singleton class manages configuration values 
 *      from the enviornment or configuration files.
 */

import { existsSync, readFileSync } from "fs";
import { join } from 'path';

interface ConfigItem {
    name: string;
    value: string;
    from: string;
}

export class Config {
    private static instance: Config; // Singleton 

    configItems: ConfigItem[] = [];
    version: string = "";
    loadTestData: boolean = false;
    configFolder: string = "/opt/mentorhub-elasticsearch";
    connectionString: string = '{}';
    clientOptions: any;
    indexName: string = "mentorhub";
    indexMapping: any = {};

    mongoConnectionString: string = "mongodb://root:example@localhost:27017";
    dbName: string = "mentorHub";
    collections: string[] = [];
    collections_default_string = '["curriculum", "encounters", "partners", "paths", "people", "plans", "topics"]';

    /**
     * Constructor gets configuration values, loads the enumerators, and logs completion
     */
    constructor() {
        this.initialize();
    }

    public initialize() {
        // Initilze Values
        this.configItems = [];
        this.version = "1.0." + this.getConfigValue("BUILT_AT", "LOCAL", false);
        this.configFolder = this.getConfigValue("CONFIG_FOLDER", this.configFolder, false);
        this.loadTestData = (this.getConfigValue("LOAD_TEST_DATA", "false", false) === "true");
        this.clientOptions = JSON.parse(this.getConfigValue("CLIENT_OPTIONS", '{"node":"http://localhost:9200"}', false));
        this.connectionString = this.getConfigValue("CONNECTION_STRING", this.connectionString, true);
        this.indexName = this.getConfigValue("INDEX_NAME", this.indexName, false);
        this.indexMapping = JSON.parse(this.getConfigValue("INDEX_MAPPING", "{}", false));

        this.mongoConnectionString = this.getConfigValue("MONGO_CONNECTION_STRING", this.mongoConnectionString, true);
        this.dbName = this.getConfigValue("MONGO_DBNAME", this.dbName, false);
        this.collections = JSON.parse(this.getConfigValue("MONGO_COLLECTIONS", this.collections_default_string, false));
        console.info("Configuration Initilized:", JSON.stringify(this.configItems));
    }

    /**
     * Get the named configuration value, from the environment if available, 
     * then from a file if present, and finally use the provided default if not 
     * found. This will add a ConfigItem that describes where this data was found
     * to the configItems array. Secret values are not recorded in the configItem.
     * 
     * @param name 
     * @param defaultValue 
     * @param isSecret 
     * @returns the value that was found.
     */
    private getConfigValue(name: string, defaultValue: string, isSecret: boolean): string {
        let value = process.env[name] || defaultValue;
        let from = 'default';

        if (process.env[name]) {
            from = 'environment';
        } else {
            const filePath = join(this.configFolder, name);
            if (existsSync(filePath)) {
                value = readFileSync(filePath, 'utf-8').trim();
                from = 'file';
            }
        }

        this.configItems.push({
            name: name,
            value: isSecret ? "secret" : value,
            from: from
        });
        return value;
    }

    /**
     * Singleton Constructor
     */
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
}

// Create a singleton instance of Config and export it
const config = Config.getInstance();
export default config;