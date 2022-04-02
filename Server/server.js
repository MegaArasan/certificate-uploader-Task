import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { certificateRouter } from "./routes/certificate.js";

const app = express();
dotenv.config();
// const PORT = 2000;
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb is connected");
  return client;
}

export const client = await createConnection();

app.listen(PORT, () => console.log("Server is up.."));

app.get("/", (req, res) => {
  res.send("HIIIIIiiii");
});
app.use("/storage", certificateRouter);
