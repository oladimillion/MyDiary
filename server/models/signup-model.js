import bcrypt from "bcryptjs";
import Models from "./models";
import { GenId } from "../utils/common";

class SignupModel extends Models{

  constructor(){
    super();
  }

  signup(data){

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);

    return this.insertData(
      Object.assign(
        {}, 
        data, 
        {password: hash}
      )
    );

  }

  delete(data){

    const text = `
      DELETE FROM users
      WHERE username = $1 
    `;

    const query = {
      text,
      values: [
        data.username
      ],
    };

    return this.pool.query(query);
  }

  insertData(data){
    const text = `
      INSERT INTO users(
        user_id,
        username,
        email,
        password,
        created_at
      )
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const query = {
      text,
      values: [
        GenId(15),
        data.username,
        data.email,
        data.password,
        new Date()
      ],
    };

    return this.pool.query(query);
  }

  
  isDataExisting(data){

    const text1 = `
      SELECT a.username FROM users a WHERE a.username = $1;
    `;

    const query1 = {
      text: text1,
      values: [data.username]
    };

    const text2 = `
      SELECT a.email FROM users a WHERE a.email = $1;
    `;

    const query2 = {
      text: text2,
      values: [data.email]
    };

    return Promise.all([
      this.pool.query(query1), 
      this.pool.query(query2)
    ]);
  }


}

export default SignupModel;
