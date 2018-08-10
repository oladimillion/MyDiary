import bcrypt from "bcryptjs";
import Models from "./models";
import { GenId } from "../utils/common";

class ReminderModel extends Models{

  constructor(){
    super();
  }

  createOrUpdate(data){
    return this.getAll(data)
      .then(result => {
        if(result.rowCount){
          return this.update(data);
        } else {
          return this.insert(data);
        }
      })
  }

  deleteOne(data){

    const text = `
      DELETE FROM reminders
      WHERE user_id = $1 AND reminder_id = $2
    `;

    const query = {
      text,
      values: [
        data.userId,
        data.reminderId,
      ],
    };

    return this.pool.query(query);
  }

  insert(data){
    const text = `
      INSERT INTO reminders(
        reminder_id,
        user_id,
        time,
        updated_at,
        created_at
      )
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const query = {
      text,
      values: [
        GenId(15),
        data.userId,
        data.time,
        new Date(),
        new Date()
      ],
    };

    return this.pool.query(query);
  }

  getAll(data){

    const text = `
      SELECT * 
      FROM reminders
      WHERE user_id = $1
    `;

    const query = {
      text,
      values: [data.userId],
    };

    return this.pool.query(query);
  }

  update(data){

    const text = `
      UPDATE reminders
      SET time = $1, updated_at = $2
      WHERE user_id = $3
      RETURNING *
    `;

    const query = {
      text,
      values: [
        data.time,
        new Date(),
        data.userId,
      ],
    };

    return this.pool.query(query);
  }

}


export default ReminderModel;



