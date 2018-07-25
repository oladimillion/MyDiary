import { Pool, Client } from 'pg';

let connectionString = "";

if(process.env.NODE_ENV !== "production"){
  connectionString = 'postgresql://oladimillion:dimillion@localhost:5432/mydiary'
} else {
  connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
}


class Models {

  constructor(){
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

export default new Models;
