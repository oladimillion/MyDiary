import Data from "./data";
import { GenId } from "../utils/common";
import { Validator } from "../utils/validator";

class Diary {

  constructor(){}

  createEntry(req, res, next){

    const data = req.body;

    const errors = Validator(data);

    if(errors.length){
      return res.status(403).json({
        message: errors,
      });
    }

    Object.assign(data, {id: GenId()});
  
    Data.push(data);

    return res.status(200).json({
      message: ["Entry successfully added"],
      payload: data,
    });
  }

  getEntries(req, res, next){
    return res.status(200).json({
      payload: Data,
    });
  }

  getEntry(req, res, next){

    const data = Data.find(item => {
      return item.id === req.params.id;
    }) 

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
    const data = req.body;

    const errors = Validator(data);

    if(errors.length){
      return res.status(403).json({
        message: errors,
      });
    }

    let index = -1;
    let _data = Data.find((item, i) => {
      index = i;
      return item.id === req.params.id;
    });

    if(!_data){
      return res.status(400).json({
        message: ["Entry not found"],
      });
    }

    Object.assign(_data, data);
    Data[index] = _data;

    return res.status(200).json({
      message: ["Entry updated successfully"],
      payload: data, 
    });
  }

}


export default new Diary;
