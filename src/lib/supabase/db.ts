import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from 'drizzle-orm/postgres-js/migrator';


dotenv.config({path:'.env'});

if (!process.env.DATABASE_URL) {
    console.log('🔴 No database URL');
}


// make client from database URL and create db using drizzle
const client = postgres(process.env.DATABASE_URL as string ,{max:1});
const db = drizzle(client, {schema});

// upto here we setup drizzle to query DB
// now we have to migrate the stuff


//everytime we call db this migratedb will be called which keep our db upto date.
const migrateDb = async()=>{
    try{
        console.log('🟠 Migrating client');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('🟢 Successfully Migrated');
    }
    catch(error){
        console.log('🔴 Error Migrating client', error);
    }
}

migrateDb();

export default db;