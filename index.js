import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import stationDAO from './dao/stationDAO.js';

async function main() {
    dotenv.config();
    
    const client = new mongodb.MongoClient(
        process.env.GREENHOUSE_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await stationDAO.injectDB(client);
        //start server
        app.listen(port, '0.0.0.0', () => {
            console.info(`Server running at http://192.168.1.71:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main().catch(console.error);