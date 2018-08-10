import express from "express";
import { Private } from "../middlewares/private";
import reminder from "../controllers/reminder";

const route = express.Router();

route.delete('/:reminderId', 
  Private,
  reminder.deleteOne.bind(reminder),
);

route.get('/', 
  Private,
  reminder.getAll.bind(reminder),
);

route.post('/', 
  Private,
  reminder.createOrUpdate.bind(reminder),
);

export default route;
