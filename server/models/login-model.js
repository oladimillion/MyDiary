import bcrypt from "bcryptjs";
import Models from "./models";
import { GenId } from "../utils/common";

class LoginModel extends Models{

  constructor(){
    super();
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

}

export default LoginModel;
