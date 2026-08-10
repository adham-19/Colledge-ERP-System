import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import setupSocket from "./sockets/socket.js";

import adminRouter from "./routes/admin.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});
setupSocket(io);

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "*",
  }),
);

app.use("/admin", adminRouter);

app.use(function (req, res) {
  res.status(404).json("Page Not Found");
});

app.use(function (err, req, res) {
  res.status(500).json(err.message);
});

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});
