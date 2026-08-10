import jwt from "jsonwebtoken";

export default function socketAuth(socket, next) {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    socket.user = decoded;

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
}
