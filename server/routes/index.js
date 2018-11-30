import express from "express";
import basePath from "path";
import authRoute from "./auth";
import diaryRoute from "./diary";
import reminderRoute from "./reminder";

const route = express.Router();

const path = "/api/v1";

route.use(path + "/auth", authRoute);
route.use(path + "/entries", diaryRoute);
route.use(path + "/reminders", reminderRoute);


route.use(express.static(basePath.join(__dirname, '../../dist')));
route.get('*', (req, res) => {
  res.sendFile(basePath.resolve(__dirname, '../../dist/index.html'));
});

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
