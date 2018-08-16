import ReminderModel from "../models/reminder-model";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validators";

import NodeMailer from "../utils/nodemailer";

class Reminder {

  constructor(){
    this.reminderModel = new ReminderModel();
    this.nodeMailer = new NodeMailer(ReminderModel);
  }

  createOrUpdate(req, res){

    const errors = {};

    Object.keys(req.body).forEach(key => {
      if(typeof req.body[key] !== "string"){
        Object.assign(
          errors,
          {[key]: "Invalid data provided"},
        );
      }
    })


    if(Object.keys(errors).length){
      return res.status(403).json({
        errors
      });
    }

    if(Object.keys(Validator(req.body)).length){
      return res.status(403).json({
        errors: Validator(req.body),
      });
    }

    const data = Object.assign({}, req.body, {userId: req.userId});

    return this.reminderModel.createOrUpdate(data)
      .then(result => {

        this.nodeMailer.getOne(result.rows[0]);

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
