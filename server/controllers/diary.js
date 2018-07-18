import Data from "./data";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validator";

class Diary {

  constructor(){
    this.Data = Data;
  }

  createEntry(req, res, next){

    const errors = Validator(req.body);

    if(errors.length){
      return res.status(403).json({
        message: errors,
      });
    }

    const data = Object.assign({}, req.body, {entry_id: GenId()});
  
    this.Data = [...this.Data, data];

    return res.status(200).json({
      message: ["Entry successfully added"],
      payload: data,
    });
  }

  getEntries(req, res, next){
    return res.status(200).json({
      payload: this.Data,
    });
  }

  getEntry(req, res, next){

    const data = this.Data.find(item => {
      return item.entry_id === req.params.id;
    }); 

    if(!data){
      return res.status(400).json({
        message: ["Entry not found"],
      });
    }

    return res.status(200).json({
      payload: data, 
    });
  }

  updateEntry(req, res, next){

    const errors = Validator(req.body);

    if(errors.length){
      return res.status(403).json({
        message: errors,
      });
    }

    const _data = this.Data.find((item)=>{
      return item.entry_id === req.params.id
    });

    if(!_data){
      return res.status(400).json({
        message: ["Entry not found"],
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
      message: ["Entry updated successfully"],
      payload: data, 
    });
  }

}


export default new Diary;
