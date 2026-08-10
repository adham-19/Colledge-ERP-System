import socketAuth from "./socketAuth.js";
import studentModel from "../models/student.js";

export default function setupSocket(io) {
io.use(socketAuth);

  io.on("connection", async (socket) => {
    console.log("user connected:", socket.id);

    if (socket.user.role === 'student') {
      const student = await studentModel.findById(socket.user.id);
      if (student) {
        for (const subjectId of student.subjects) {
          socket.join(`subject:${subjectId}`);
          console.log(`${socket.id} joined subject: ${subjectId}`)
        }
      }
    }

    socket.on("join-subject", (subjectId) => {
      socket.join(`subject:${subjectId}`);
      console.log(`${socket.id} joined subject:${subjectId}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });
  });
}
