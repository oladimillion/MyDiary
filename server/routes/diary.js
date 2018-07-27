import express from "express";
import { Private } from "../middlewares/private";
import { DiaryMiddleware } from "../middlewares/diary";
import diary from "../controllers/diary";

const route = express.Router();

route.get('/', 
  Private,
  diary.getEntries.bind(diary)
);

route.get('/:id', 
  Private,
  diary.getEntry.bind(diary),
);

route.post('/', 
  Private,
  DiaryMiddleware,
  diary.createEntry.bind(diary),
);

route.put('/:id', 
  Private,
  DiaryMiddleware,
  diary.updateEntry.bind(diary),
);

route.delete('/:user_id', 
  Private,
  diary.deleteAll.bind(diary),
);

export default route;


