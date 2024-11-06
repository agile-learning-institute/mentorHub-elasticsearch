import { MongoClient } from 'mongodb';
import config from './config/Config';
import * as fs from "fs";

async function main() {
    const mongoClient = new MongoClient(config.mongoConnectionString);

    try {
        await mongoClient.connect();
        const db = mongoClient.db(config.dbName);
        console.info("Database", config.dbName, "Connected");

        let docs: any[] = [];  // Array to hold all documents from all collections
        for (const collectionName of config.collections) {
            const collection = db.collection(collectionName);
            const results = await collection.find({}).toArray() as any[];
            results.forEach((doc) => {
                const originalId = doc._id;  
                doc._id = { collection_name: collectionName, collection_id: originalId };  // Replace _id with new object
                docs.push(doc);
            });
        }

        // Define output path and write collected documents to JSON file
        const jsonOutputPath = './configurations/TEST_DATA.json';
        fs.writeFileSync(jsonOutputPath, JSON.stringify(docs, null, 2));
        console.info("Test data has been saved to", jsonOutputPath);

    } catch (error) {
        console.error("Error retrieving data:", error);
    } finally {
        await mongoClient.close();
        console.info("MongoDB connection closed.");
    }
}

main();