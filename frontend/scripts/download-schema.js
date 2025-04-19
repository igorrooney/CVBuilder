const { Client, Databases } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
	.setKey(process.env.NEXT_APPWRITE_KEY);

const databases = new Databases(client);

async function downloadSchema() {
	try {
		// Get all collections from the database
		const collections = await databases.listCollections(process.env.NEXT_PUBLIC_APPWRITE_DATABASE);

		const schema = {
			collections: collections.collections.map((collection) => ({
				id: collection.$id,
				name: collection.name,
				attributes: collection.attributes,
				indexes: collection.indexes,
			})),
		};

		// Write schema to file
		const fs = require('fs');
		const path = require('path');
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
