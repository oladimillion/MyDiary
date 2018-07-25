import { Pool } from 'pg';

import dotenv from "dotenv";
dotenv.config();

class Models {

  constructor(){

    let connectionString = "";

    if(process.env.NODE_ENV !== "production"){
      connectionString = process.env.LOCAL_DB_URI;
    } else {
      connectionString = process.env.SERVER_DB_URI;
    }

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
        user_id VARCHAR UNIQUE NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS entries(
        user_id VARCHAR NOT NULL,
        entry_id VARCHAR UNIQUE NOT NULL,
        entry_title VARCHAR NOT NULL,
        entry_content TEXT NOT NULL,
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
