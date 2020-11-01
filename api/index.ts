import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import * as mongoose from "mongoose";
import UserRouter from "./routes/users";

const port = process.env.SERVER_PORT || 3080;
const database =
  process.env.DATABASE ||
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017";

// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-backend-typescript-version-27a6a283a7c5
// https://github.com/bbachi/react-nodejs-typescript-example
// https://github.com/seanpmaxwell/express-generator-typescript

const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/client/build/"));

// Set up CORS policy
app.use(cors());

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch(() => console.log("Failed to connect to DB!"));

// Morgan is for logging
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

// api route
app.use("/api/users", UserRouter);

// handle undefined routes
app.use("*", (req, res, next) => {
  res.send("Make sure url is correct!!!");
});


app.listen(port);
console.log("App listening on port " + port);