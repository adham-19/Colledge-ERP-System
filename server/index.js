import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import setupSocket from "./sockets/socket.js";
import { addDummyAdmin } from "./controllers/adminController.js";

import adminRouter from "./routes/adminRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import facultyRouter from "./routes/facultyRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});
setupSocket(io);

app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/faculty", facultyRouter);

app.use(function (req, res) {
  res.status(404).json({ message: "Page Not Found" });
});

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("db connected");
    addDummyAdmin();

    server.listen(process.env.PORT, () => {
      console.log(`server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
