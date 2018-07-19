import express from "express";
import authRoute from "./auth";
import diaryRoute from "./diary";

const route = express.Router();

const _path = "/api/v1";

route.use(_path + "/auth", authRoute);
route.use(_path + "/entries", diaryRoute);

export default route;
