import bcrypt from "bcryptjs";
import Models from "./models";
import { GenId } from "../utils/common";

class AuthModel extends Models{

  constructor(){
    super();
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

  getOne(data){

    const text = `
      SELECT email, username, password 
      FROM users
      WHERE user_id = $1
    `;

    const query = {
      text,
      values: [data.userId],
    };

    return this.pool.query(query);
  }

  hashPassword(data){
    return bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
  }

  insertData(data){
    const text = `
      INSERT INTO users(
        user_id,
        username,
        email,
        password,
        updated_at,
        created_at
      )
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const userId = data.userId || GenId(15);

    const query = {
      text,
      values: [
        userId,
        data.username,
        data.email,
        data.password,
        new Date(),
        new Date()
      ],
    };

    return this.pool.query(query);
  }

  
  isDataExisting(data){

    const text1 = `
      SELECT a.username, a.user_id 
      FROM users a 
      WHERE a.username = $1;
    `;

    const query1 = {
      text: text1,
      values: [data.username]
    };

    const text2 = `
      SELECT a.email, a.user_id 
      FROM users a 
      WHERE a.email = $1;
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

  login(data){

    return this.selectData(data)
      .then(res => {
        if(res.rows.length){
          const { password } = res.rows[0];
          return {
            exist: bcrypt.compareSync(data.password, password),
            user: res.rows[0],
          }
        }
        return {exist: false, user: null};
      })

  }

  selectData(data){

    const text = `
      SELECT user_id, email, username, password 
      FROM users
      WHERE username = $1
    `;

    const query = {
      text,
      values: [data.username],
    };

    return this.pool.query(query);
  }

  signup(data){

    const hash = this.hashPassword(data);

    return this.insertData(
      Object.assign(
        {}, 
        data, 
        {password: hash}
      )
    );
  }

  update(data){

    let hash = "";

    // hash new password provided by the user
    if(data.newPassword)
      hash = this.hashPassword({password: data.newPassword});

    Object.assign(
      data, 
      {password: !!data.newPassword ? hash : data.password}
    );

    const text = `
      UPDATE users
      SET username = $1, email = $2, password = $3, updated_at = $4
      WHERE user_id = $5
      RETURNING *
    `;

    const query = {
      text,
      values: [
        data.username,
        data.email,
        data.password,
        new Date(),
        data.userId
      ],
    };

    return this.pool.query(query);
  }


}

export default AuthModel;
