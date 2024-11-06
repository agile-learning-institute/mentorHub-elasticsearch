import MongoUtils from './MongoUtils';

describe('MongoUtils', () => {

    var mongo = new MongoUtils("mongodb://root:example@localhost:27017");

    // Initilize 
    beforeEach(async () => {

    });

    // Housekeeping
    afterEach(async () => {

    })
    
    test('test getTestData', async () => {
        let mongo = new MongoUtils("mongodb://root:example@localhost:27017");
        const testData = await mongo.getTestData("mentorHub", ["paths", "topics"]);
        expect(testData).toBeInstanceOf(Array);
        expect(testData.length).toBe(20);
    });
});
