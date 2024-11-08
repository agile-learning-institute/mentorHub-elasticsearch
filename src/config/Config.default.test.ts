/**
 * This set of unit tests test config init from env
 */
import config from './Config';

describe('Config', () => {
    
    // Initilize Config
    beforeEach(() => {
        config.initialize();
    });

    test('test BUILT_AT', () => {
        expect(config.version).toBe("1.0.LOCAL")
    });

    test('test CONFIG_FOLDER', () => {
        const expected = "/opt/mentorhub-elasticsearch";
        expect(config.configFolder).toBe(expected);
        testConfigDefaultValue("CONFIG_FOLDER", expected);
    });

    test('test LOAD_TEST_DATA', () => {
        const expected = "false";
        expect(config.loadTestData).toBe(false);
        testConfigDefaultValue("LOAD_TEST_DATA", expected);
    });

    test('test CONNECTION_STRING', () => {
        const expected = '{}';
        expect(config.connectionString).toBe(expected);
        testConfigDefaultValue("CONNECTION_STRING", "secret");
    });

    test('test MONGO_DBNAME', () => {
        const expected = "mentorHub";
        expect(config.dbName).toBe(expected);
        testConfigDefaultValue("MONGO_DBNAME", expected);
    });

    test('test MONGO_COLLECTIONS', () => {
        expect(config.collections).toEqual(["curriculum", "encounters", "partners", "paths", "people", "plans", "topics"]);
        testConfigDefaultValue("MONGO_COLLECTIONS", '["curriculum", "encounters", "partners", "paths", "people", "plans", "topics"]');
    });

    test('test INDEX_NAME', () => {
        const expected = "mentorhub";
        expect(config.indexName).toBe(expected);
        testConfigDefaultValue("INDEX_NAME", expected);
    });

    test('test INDEX_MAPPING', () => {
        expect(config.indexMapping).toBeInstanceOf(Object);
        testConfigDefaultValue("INDEX_MAPPING", "{}");
    });
    
    function testConfigDefaultValue(configName: string, expectedValue: string) {
        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("default");
            expect(item.value).toBe(expectedValue);
        }
    }

});