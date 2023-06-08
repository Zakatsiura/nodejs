import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json({
    message: error.message,
    status: error.status,
  });
});

app.listen(configs.PORT || 5000, () => {
  mongoose
    .connect(configs.DB_URL)
    .then(() => {
      console.log(`Connected to MongoDB`);
      console.log(`Server has been started on PORT ${configs.PORT}`);
    })
    .catch((error) => {
      console.error(`Failed to connect to MongoDB: ${error}`);
    });
});
