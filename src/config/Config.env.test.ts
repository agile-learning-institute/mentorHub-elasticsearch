/**
 * This set of unit tests test config init from env
 */
import config from './Configtemp';

describe('Config', () => {

    test('test BUILT_AT', () => {
        testConfigEnvironmentValue("BUILT_AT");
    });

    test('test CONFIG_FOLDER', () => {
        testConfigEnvironmentValue("CONFIG_FOLDER");
    });

    test('test LOAD_TEST_DATA', () => {
        testConfigEnvironmentValue("LOAD_TEST_DATA");
    });

    test('test CLIENT_OPTIONS', () => {
        testConfigEnvironmentValue("CLIENT_OPTIONS");
    });

    test('test MONGO_DBNAME', () => {
        testConfigEnvironmentValue("MONGO_DBNAME");
    });
   
    test('test MONGO_COLLECTIONS', () => {
        testConfigEnvironmentValue("MONGO_COLLECTIONS");
    });
   
    test('test INDEX_NAME', () => {
        testConfigEnvironmentValue("INDEX_NAME");
    });
   
    test('test INDEX_MAPPING', () => {
        testConfigEnvironmentValue("INDEX_MAPPING");
    });

    // Test that a configuration value was properly loaded from an environment variable
    function testConfigEnvironmentValue(configName: string, secret: boolean = false) {
        process.env[configName] = '"ENVIRONMENT"';
        config.initialize();
        process.env[configName] = "";

        const items = config.configItems;

        const item = items.find(i => i.name === configName);
        expect(item).toBeDefined();
        if (item) {
            expect(item.name).toBe(configName);
            expect(item.from).toBe("environment");
            if (secret) {
                expect(item.value).toBe("secret");
            } else {
                expect(item.value).toBe('"ENVIRONMENT"');
            }
        }
    }

});