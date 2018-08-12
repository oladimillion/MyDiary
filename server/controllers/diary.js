import DiaryModel from "../models/diary-model";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validators";

class Diary {

  constructor(){
    this.diaryModel = new DiaryModel();
  }

  createEntry(req, res){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = Object.assign({}, req.body, {userId: req.userId});

    return this.diaryModel.create(data)
      .then(result => {
        const entry = result.rows[0];
        return res.status(201).json({
          message: "Entry successfully added",
          entry,
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entry could not be added",
        });
      })
  }

  deleteAll(req, res){

    const data = Object.assign({}, {userId: req.userId});

    return this.diaryModel.deleteAll(data)
      .then(result => {
        return res.status(204).json({
          message: "Entries deleted successfully",
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entries not deleted",
        });
      })
  }

  deleteOne(req, res){

    const data = Object.assign(
      {}, 
      {
        userId: req.userId,
        entryId: req.params.entryId
      }
    );

    return this.diaryModel.deleteOne(data)
      .then(result => {
        return res.status(204).json({
          message: "Entry deleted successfully",
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entry not deleted",
        });
      });
  }

  getEntries(req, res){
    return this.diaryModel.getAll({userId: req.userId})
      .then(result => {
        const message = result.rows.length ? 
          "Entries successfully fetched" : "No entry yet"
        return res.status(200).json({
          message,
          entries: result.rows.sort(this.sort.call(this)),
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entries fetch failed",
        });
      });
  }

  getEntry(req, res){

    const data = {userId: req.userId, entryId: req.params.entryId};

    return this.diaryModel.getOne(data)
      .then(result => {
        if(result.rows.length){
          return res.status(200).json({
            message: "Entry successfully fetched",
            entry: result.rows[0],
          });
        } else {
          return res.status(404).json({
            error: "Entry not found",
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entry fetch failed",
        });
      })
  }

  sort(){
    return (a, b) => {
      return (Date.parse(a.updated_at) < Date.parse(b.updated_at));
    }
  }

  updateEntry(req, res){
    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = {userId: req.userId, entryId: req.params.entryId};

    return this.diaryModel
      .update(Object.assign({}, req.body, data))
      .then(result => {
        const entry = result.rows[0];
        if(result.rows.length){
          return res.status(200).json({
            message: "Entry updated successfully",
            entry,
          });
        } else {
          return res.status(404).json({
            error: "Entry not found",
          });
        }
      })
      .catch(err => {
        return res.status(500).json({
          error: "Entry update failed",
        });
      })
  }

}


export default new Diary;
