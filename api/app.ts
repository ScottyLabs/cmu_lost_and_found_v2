import * as bodyParser from "body-parser";
import * as express from "express";
import Routes from "./routes/routes";

// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-backend-typescript-version-27a6a283a7c5
// https://github.com/bbachi/react-nodejs-typescript-example
// https://github.com/seanpmaxwell/express-generator-typescript

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/client/build/"));


app.get("/", (req, res, next) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

// user route
app.use("/api", Routes);

// handle undefined routes
app.use("*", (req, res, next) => {
  res.send("Make sure url is correct!!!");
});


export default app;