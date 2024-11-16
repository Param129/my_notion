// drizzle-orm is a library that interact with SQL or other relation DB and perform all tasks on DB in TS language


import type {Config} from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({path:'.env'});


if(!process.env.DATABASE_URL){
    console.log('🔴 Cannot find database url');
}

export default {
    schema: './src/lib/supabase/schema.ts',   // schema file
    out: './migrations',   // output directory for generated migrations
    driver: 'pg', //driver for database
    dbCredentials: {
      connectionString: process.env.DATABASE_URL || '',
    },
  } satisfies Config;