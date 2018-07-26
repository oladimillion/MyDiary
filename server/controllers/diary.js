import jwt from "jsonwebtoken";
import { DiaryData } from "../models/data";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validators";

class Diary {

  constructor(){
    this.Data = DiaryData;
  }

  createEntry(req, res, next){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const data = Object.assign(
      {}, 
      req.body, 
      {entry_id: GenId(), created_at: new Date()}
    );
  
    this.Data = [...this.Data, data];

    return res.status(200).json({
      message: "Entry successfully added",
      entry: data,
    });
  }

  getEntries(req, res, next){
    return res.status(200).json({
      entries: this.Data,
    });
  }

  getEntry(req, res, next){

    const data = this.Data.find(item => {
      return item.entry_id === req.params.id;
    }); 

    if(!data){
      return res.status(404).json({
        error: "Entry not found",
      });
    }

    return res.status(200).json({
      entry: data, 
    });
  }

  updateEntry(req, res, next){

    const errors = Validator(req.body);

    if(Object.keys(errors).length){
      return res.status(403).json({
        errors,
      });
    }

    const _data = this.Data.find((item)=>{
      return item.entry_id === req.params.id
    });

    if(!_data){
      return res.status(400).json({
        error: "Entry not found",
      });
    }

    const data = Object.assign({}, _data, req.body);

    this.Data = this.Data.map(item => {
      if(item.entry_id === req.params.id){
        return data;
      }
      return item;
    });

    return res.status(200).json({
      message: "Entry updated successfully",
      entry: data, 
    });
  }

}


export default new Diary;
