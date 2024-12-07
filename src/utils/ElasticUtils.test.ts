import ElasticUtils from './ElasticUtils';
import utils from './ElasticUtils';

describe('ElasticUtils', () => {

    var elastic = new ElasticUtils({"node":"http://localhost:9200"});

    // initialize 
    beforeEach(async () => {
    });

    // Housekeeping
    afterEach(async () => {
        const result = await elastic.dropIndex("test_index");
        expect(result).toBe('Index test_index removed');
    })
    
    test('test testConnection', async () => {
        var result = await elastic.createIndex("test_index");
        expect(result).toBe('Index test_index created');

        result = await elastic.testConnection();
        expect(result).toBe('Elasticsearch server is reachable');
    });

    test('test putMapping', async () => {
        var result = await elastic.createIndex("test_index");
        expect(result).toBe('Index test_index created');

        result = await elastic.putMapping("test_index", {});
        expect(result).toBe("Mapping for test_index successfully put");
    });

    test('test indexTestData', async () => {
        var result = await elastic.createIndex("test_index");
        expect(result).toBe('Index test_index created');

        result = await elastic.indexTestData("test_index", [{"name":"Foo"},{"name":"Bar"}]);
        expect(result).toBe("Test Data Processed 2 records, with 0 errors");
    });
});
