import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

import adminRouter from "./routes/admin.js";
app.use("/admin", adminRouter);

app.use(function (req, res) {
  res.status(404).json("Page Not Found");
});

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});
