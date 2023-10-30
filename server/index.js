import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";
// to solve the issue of using es6
// in the public folder
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// bind to a port
const expServer = app.listen(PORT, () => {
  console.log(`connected to server port ${PORT}`);
});

// calling socket
const io = new Server(expServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
  allowEIO3: true,
});

//listening for connection
io.on("connection", (socket) => {
  console.log(socket.id);
  // informing users of new user

  // listening for message
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.id.slice(-5)}: ${message}`);
  });
});
