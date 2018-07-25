import jwt from "jsonwebtoken";
import DiaryModel from "../models/diary-model";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validators";

class Diary {

  constructor(){
    this.diaryModel = new DiaryModel();
  }

  createEntry(req, res, next){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = Object.assign({}, req.body, {user_id: req._user_id});

    return this.diaryModel.create(data)
      .then(result => {
        return res.status(200).json({
          message: "Entry successfully added",
          entry: result.rows[0],
        });
      })
      .catch(err => {
        console.log(err)
        return res.status(403).json({
          error: "Entry could not be added",
        });
      })
  }

  getEntries(req, res, next){
    return this.diaryModel.getAll({user_id: req._user_id})
      .then(result => {
        if(result.rows.length){
          return res.status(200).json({
            entries: result.rows,
          });
        } else {
          return res.status(404).json({
            entries: result.rows,
          });
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({
          error: "Entries fetch failed",
        });
      })
  }

  getEntry(req, res, next){

    const data = {user_id: req._user_id, entry_id: req.params.id};

    return this.diaryModel.getOne(data)
      .then(result => {
        if(result.rows.length){
          return res.status(200).json({
            entry: result.rows[0],
          });
        } else {
          return res.status(404).json({
            error: "Entry not found",
          });
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({
          error: "Entry fetch failed",
        });
      })
  }

  updateEntry(req, res, next){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = {user_id: req._user_id, entry_id: req.params.id};

    return this.diaryModel.update(Object.assign({}, req.body, data))
      .then(result => {
        if(result.rows.length){
          return res.status(200).json({
            message: "Entry updated successfully",
            entry: result.rows[0],
          });
        } else {
          return res.status(404).json({
            error: "Entry not found",
          });
        }
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({
          error: "Entry update failed",
        });
      })
  }

}


export default new Diary;
