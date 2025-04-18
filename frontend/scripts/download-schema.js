image.pngrequire('dotenv').config({ path: '.env.appwrite.temp' });
const { Client, Databases } = require('node-appwrite');
const fs = require('fs');
const path = require('path');

const client = new Client()
	.setEndpoint(process.env.APPWRITE_ENDPOINT)
	.setProject(process.env.APPWRITE_PROJECT_ID)
	.setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const databaseId = '67d050e70035a896f16c'; // Database ID from .env.local

async function downloadSchema() {
	try {
		// Get all collections from the database
		const collections = await databases.listCollections(databaseId);

		const schema = {
			collections: collections.collections.map((collection) => ({
				id: collection.$id,
				name: collection.name,
				attributes: collection.attributes,
				indexes: collection.indexes,
			})),
		};

		// Write schema to file
		const schemaPath = path.join(__dirname, '..', 'src', 'schema', 'appwrite-schema.json');
		fs.mkdirSync(path.dirname(schemaPath), { recursive: true });
		fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));

		console.log('Schema downloaded successfully!');
		console.log(`Schema saved to: ${schemaPath}`);
	} catch (error) {
		console.error('Error downloading schema:', error);
		process.exit(1);
	}
}

downloadSchema();
