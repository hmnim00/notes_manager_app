import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./config/Database";
import Routes from "./routes/index.routes";

dotenv.config();
// db connection
connection;

const app: Application = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// routes
app.use("/api", Routes);

// start server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
