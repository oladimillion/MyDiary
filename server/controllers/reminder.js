import ReminderModel from "../models/reminder-model";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validators";

class Reminder {

  constructor(){
    this.reminderModel = new ReminderModel();
  }

  createOrUpdate(req, res){

    const { time } = req.body;

    if(typeof time !== "string" || !time.trim()){
      return res.status(403).json({
        error: "Invalid time provided"
      });
    }

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = Object.assign({}, req.body, {userId: req.userId});

    return this.reminderModel.createOrUpdate(data)
      .then(result => {
        return res.status(201).json({
          message: "Reminder successfully added",
          reminder: result.rows[0],
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Reminder could not be added",
        });
      })
  }

  deleteOne(req, res){

    const data = Object.assign(
      {}, 
      {
        userId: req.userId,
        reminderId: req.params.reminderId
      }
    );

    return this.reminderModel.deleteOne(data)
      .then(result => {
        return res.status(204).json({
          message: "Reminder deleted successfully",
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Reminder not deleted",
        });
      });
  }

  getAll(req, res){

    const data = Object.assign({}, {userId: req.userId,});

    return this.reminderModel.getAll(data)
      .then(result => {
        const message = result.rowCount 
          ? "Reminders successfully fetched" 
          : "No Reminder found";
        return res.status(200).json({
          message,
          reminders: result.rows,
        });
      })
      .catch(err => {
        return res.status(500).json({
          error: "Reminder not found",
        });
      });
  }


}

export default new Reminder;
