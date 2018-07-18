import express from "express";
import userRoute from "./user";
import diaryRoute from "./diary";

const route = express.Router();

const _path = "/api/v1";

route.use(_path + "/auth", userRoute);
route.use(_path + "/entries", diaryRoute);

export default route;
