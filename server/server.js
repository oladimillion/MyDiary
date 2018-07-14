import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Server } from "http";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
const http = Server(app);



// loading env variables
dotenv.config();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



if(process.env.NODE_ENV !== "production"){
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods", 
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

//load all routes
// app.use(require('./routes/index'));

app.set('port', process.env.PORT || 8000);

// connecting to database
// require("./models/database");

http.listen(app.get('port'), function (err) {
  if (!err) console.log('server listening on port ', app.get('port'));
  else console.log(err);
});


