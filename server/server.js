import express from "express";
import bodyParser from "body-parser";
import path from "path";
import baseHttp, { Server } from "http";
import morgan from "morgan";
import Models from "./models/models";
import route from "./routes/index" ;
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
const http = Server(app);


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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(route);



app.set('port', process.env.PORT || 9000);

// connecting to database
new Models().connect();

http.listen(app.get('port'), (err) => {
  if (!err) console.log('server listening on port ', app.get('port'));
  else console.log(err);
});



export default http;



