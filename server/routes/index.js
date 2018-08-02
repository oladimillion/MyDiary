import express from "express";
import authRoute from "./auth";
import diaryRoute from "./diary";

const route = express.Router();

const path = "/api/v1";

route.use(path + "/auth", authRoute);
route.use(path + "/entries", diaryRoute);

route.use((req, res) => {
	res.type('text/json');
	res.status(404);
	return res.status(404).json({error: 'route does not exist'});
});

route.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500);
	return res.status(500).json({error: 'Server error'});
});

export default route;
