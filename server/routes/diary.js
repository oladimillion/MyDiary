import express from "express";
import diary from "../controllers/diary";

const route = express.Router();

route.get('/', diary.getEntries.bind(diary));
route.get('/:id', diary.getEntry.bind(diary));
route.post('/', diary.createEntry.bind(diary));
route.put('/:id', diary.updateEntry.bind(diary));


export default route;


