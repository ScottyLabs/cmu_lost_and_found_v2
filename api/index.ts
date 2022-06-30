// Disabled for conventions
/* eslint-disable import/no-named-as-default-member */
import "dotenv/config";

import { BuildingType } from "./enums/locationTypes";
import Building from "./models/Building";
import AuthRouter from "./routes/auth";
import BuildingRouter from "./routes/buildings";
import EmailRouter from "./routes/email";
import ItemRouter from "./routes/items";
import UserRouter from "./routes/users";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

const port = process.env.SERVER_PORT || 3080;
const database = process.env.MONGO_URI || "mongodb://localhost:27017";

// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-react-app-with-nodejs-backend-typescript-version-27a6a283a7c5
// https://github.com/bbachi/react-nodejs-typescript-example
// https://github.com/seanpmaxwell/express-generator-typescript

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static(process.cwd() + "/client/build/"));

// Set up CORS policy
app.use(cors());

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to " + database))
  .catch(() => console.log("Failed to connect to DB at: " + database));

(async () => {
  for (const building in BuildingType) {
    if (building !== BuildingType.ALL) {
      await Building.updateOne(
        { name: String(building) },
        { $setOnInsert: { name: String(building) } },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
  }
})();

// Morgan is for logging
app.use(morgan("dev"));

// api route
app.use("/api/accounts", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/items", ItemRouter);
app.use("/api/buildings", BuildingRouter);
app.use("/api/email", EmailRouter);

// handle undefined routes
app.use("*", (req, res, _next) => {
  res.sendFile(process.cwd() + "/client/build/index.html");
});

app.listen(port);
console.log("App listening on port " + port);
