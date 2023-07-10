import express, { Express, NextFunction, Request, Response } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db";
import { Server } from "socket.io";
import http from "http";

// importing Routes

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import adminRoutes from "./routes/adminRoutes";
import adsRoutes from "./routes/adsRoutes";

dotenv.config();

connect();

const app: Express = express();
const port: number = Number(process.env.PORT);
const corsOptions = {
  origin: "http://localhost:3000",
};
// Middleware for JSON parsing
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
});

// Use the route files for specific paths
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ads", adsRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
