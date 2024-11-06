import { MongoClient } from "mongodb";

export default class MongoUtils {
    private mongoClient: MongoClient;

    constructor(connectionString: string) {
        this.mongoClient = new MongoClient(connectionString);
    }

    public async getTestData(dbName: string, collections: string[]): Promise<any[]> {
        await this.mongoClient.connect();
        const db = this.mongoClient.db(dbName);
        console.info("Database", dbName, "Connected");

        let docs: any[] = [];
        for (const collectionName of collections) {
            const collection = db.collection(collectionName);
            const results = await collection.find({}).toArray() as any[];
            results.forEach((doc) => {
                const originalId = doc._id;  
                doc._id = { collection_name: collectionName, collection_id: originalId };  // Replace _id with new object
                docs.push(doc);
            });
        }
        console.info(`Harvested ${docs.length} documents from ${collections.length} collections`);
        return docs;
    }   
}
