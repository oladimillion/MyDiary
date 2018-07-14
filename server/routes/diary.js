import express from "express";
import diary from "../controllers/diary";

const route = express.Router();

route.get('/', diary.getEntries);
route.get('/:id', diary.getEntry);
route.post('/', diary.createEntry);
route.put('/:id', diary.updateEntry);


export default route;


