import express from "express";
import { Private } from "../middlewares/private";
import { DiaryMiddleware } from "../middlewares/diary";
import diary from "../controllers/diary";

const route = express.Router();

route.delete('/:entryId', 
  Private,
  diary.deleteOne.bind(diary),
);

route.get('/', 
  Private,
  diary.getEntries.bind(diary)
);

route.get('/:entryId', 
  Private,
  diary.getEntry.bind(diary),
);

route.post('/', 
  Private,
  DiaryMiddleware,
  diary.createEntry.bind(diary),
);

route.put('/:entryId', 
  Private,
  DiaryMiddleware,
  diary.updateEntry.bind(diary),
);

if(process.env.NODE_ENV !== "production"){
  // delete all entries pertaining to a user
  route.delete('/:userId', 
    Private,
    diary.deleteAll.bind(diary), 
  );
}

export default route;


