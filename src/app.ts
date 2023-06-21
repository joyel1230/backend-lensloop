import express, { Express, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db";

// importing Routes

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import adminRoutes from "./routes/adminRoutes";

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

// Use the route files for specific paths
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/api", async (req: Request, res: Response) => {

});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
