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
                doc.collection_id = doc._id;
                doc.collection_name = collectionName;
                delete doc._id;
                docs.push(doc);
            });
        }
        await this.mongoClient.close()
        console.info(`Harvested ${docs.length} documents from ${collections.length} collections`);
        return docs;
    }   
}
