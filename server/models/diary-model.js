import Models from "./models";
import { GenId } from "../utils/common";

class DiaryModel extends Models{

  constructor(){
    super();
  }

  create(data){

    const text = `
      INSERT INTO entries(
        user_id,
        entry_id,
        entry_title,
        entry_content,
        updated_at,
        created_at
      )
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const query = {
      text,
      values: [
        data.userId,
        GenId(15),
        data.entryTitle,
        data.entryContent,
        new Date(),
        new Date()
      ],
    };

    return this.pool.query(query);
  }

  deleteAll(data){

    const text = `
      DELETE FROM entries
      WHERE user_id = $1 
    `;

    const query = {
      text,
      values: [
        data.userId,
      ],
    };

    return this.pool.query(query);
  }

  deleteOne(data){

    const text = `
      DELETE FROM entries
      WHERE user_id = $1 AND entry_id = $2
    `;

    const query = {
      text,
      values: [
        data.userId,
        data.entryId
      ],
    };

    return this.pool.query(query);
  }

  getOne(data){

    const text = `
      SELECT user_id, entry_id, entry_title,
      entry_content, updated_at, created_at
      FROM entries
      WHERE user_id = $1 AND entry_id = $2
    `;

    const query = {
      text,
      values: [
        data.userId,
        data.entryId
      ],
    };

    return this.pool.query(query);
  }

  getAll(data){

    const text = `
      SELECT user_id, entry_id, entry_title,
      entry_content, updated_at, created_at
      FROM entries
      WHERE user_id = $1
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
      UPDATE entries
      SET entry_title = $1, entry_content = $2, updated_at = $3
      WHERE user_id = $4 AND entry_id = $5
      RETURNING *
    `;

    const query = {
      text,
      values: [
        data.entryTitle,
        data.entryContent,
        new Date(),
        data.userId,
        data.entryId
      ],
    };

    return this.pool.query(query);
  }
}


export default DiaryModel;
