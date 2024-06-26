import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema"

export const client = new Client({
    connectionString: process.env.Database_URL as string,   //get the database url from the environment
})

const main = async () => {
    await client.connect();  //connect to the database
}
main();


const db = drizzle(client, { schema, logger: true })  //create a drizzle instance

export default db;

// import "dotenv/config";
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from "./schema"


// const client = neon(process.env.Database_URL!)

// const db = drizzle(client, { schema, logger: true })  //create a drizzle instance

// export default db; 