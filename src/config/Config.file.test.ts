/**
 * This set of unit tests test config init from files
 * and uses the files in /test/configTest
 */
import config from './Config';

describe('Config', () => {

    // Clear all mocks before each test
    beforeEach(() => {
        process.env.CONFIG_FOLDER = "./test"
        config.initialize();
        process.env.CONFIG_FOLDER = "";
    });

    test('test LOAD_TEST_DATA', () => {
        testConfigFileValue("LOAD_TEST_DATA");
    });

    test('test CONNECTION_STRING', () => {
        testConfigFileValue("CONNECTION_STRING", true);
    });

    test('test MONGO_CONNECTION_STRING', () => {
        testConfigFileValue("MONGO_CONNECTION_STRING", true);
    });

    test('test MONGO_DBNAME', () => {
        testConfigFileValue("MONGO_DBNAME");
    });

    test('test MONGO_COLLECTIONS', () => {
        testConfigFileValue("MONGO_COLLECTIONS");
    });

    test('test CLIENT_OPTIONS', () => {
        testConfigFileValue("CLIENT_OPTIONS");
    });

    test('test INDEX_NAME', () => {
        testConfigFileValue("INDEX_NAME");
    });

    test('test INDEX_MAPPING', () => {
        testConfigFileValue("INDEX_MAPPING");
    });

    // Test that a file based config value is used
    // Depends on the contents of ../../test/configTest
    function testConfigFileValue(configName: string, secret: boolean = false) {
        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("file");
            if (secret) {
                expect(item.value).toBe("secret");
            } else {
                expect(item.value).toBe('"TEST_VALUE"');
            }
        }
    }
});