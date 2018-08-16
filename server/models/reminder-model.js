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
        zone_offset,
        time,
        updated_at,
        created_at
      )
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const zoneOffset = data.zoneOffset || 
      new Date().getTimezoneOffset().toString();

    const query = {
      text,
      values: [
        GenId(15),
        data.userId,
        zoneOffset,
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

  getAllUsersAndReminder(){

    const text = `
      SELECT r.reminder_id, r.user_id, r.zone_offset, r.time, u.email
      FROM users u
      RIGHT JOIN reminders r
      ON u.user_id = r.user_id
    `;

    const query = {
      text,
    };

    return this.pool.query(query);
  }

  getOneUsersAndReminder(data){

    const text = `
      SELECT r.reminder_id, r.user_id, r.zone_offset, r.time, u.email 
      FROM users u 
      RIGHT JOIN reminders r 
      ON u.user_id = r.user_id 
      WHERE r.user_id = $1;
    `;

    const query = {
      text,
      values: [
        data.userId,
      ],
    };

    return this.pool.query(query);
  }

  update(data){

    const text = `
      UPDATE reminders
      SET time = $1, zone_offset = $2 , updated_at = $3
      WHERE user_id = $4
      RETURNING *
    `;

    const zoneOffset = data.zoneOffset || 
      new Date().getTimezoneOffset().toString();

    const query = {
      text,
      values: [
        data.time,
        zoneOffset,
        new Date(),
        data.userId,
      ],
    };

    return this.pool.query(query);
  }

}


export default ReminderModel;



