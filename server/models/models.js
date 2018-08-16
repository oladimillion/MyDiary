import { Pool } from 'pg';

import dotenv from "dotenv";
dotenv.config();

class Models {

  constructor(){

    const connectionString = process.env.DATABASE_URL 
      || process.env.LOCAL_DB_URI;

    this.pool = new Pool({
      connectionString,
    });
  }

  connect(){
    this.pool.connect()
      .then(this.onConnection.bind(this))
      .catch(this.onError.bind(this));
  }

  createTable(){
    const createTable = `
      CREATE TABLE IF NOT EXISTS users(
        user_id VARCHAR PRIMARY KEY,
        username VARCHAR UNIQUE NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        updated_at TIMESTAMP, 
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS entries(
        entry_id VARCHAR PRIMARY KEY, 
        user_id VARCHAR REFERENCES users(user_id) ON DELETE CASCADE, 
        entry_title VARCHAR NOT NULL, 
        entry_content VARCHAR NOT NULL, 
        updated_at TIMESTAMP, 
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reminders(
        reminder_id VARCHAR PRIMARY KEY, 
        user_id VARCHAR REFERENCES users(user_id) ON DELETE CASCADE, 
        zone_offset VARCHAR, 
        time TIME NOT NULL, 
        updated_at TIMESTAMP, 
        created_at TIMESTAMP
      );
    `;

    this.pool.query(createTable)
      .then(this.onTableCreate.bind(this))
      .catch(this.onError.bind(this));
  }

  onConnection(){
    console.log("Connection to db established");
    this.createTable();
  }

  onTableCreate(){
    console.log("Table created");
  }

  onError(err){
    console.log("Error occured: ", err);
  }

}



export default Models;
