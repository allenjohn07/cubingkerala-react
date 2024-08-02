import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/usersRoute.js";
import { RequestRouter } from "./routes/requestsRoute.js";
import { MemberRouter } from "./routes/memberRoute.js";

const port = process.env.PORT || 9000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/request", RequestRouter);
app.use("/members", MemberRouter)

mongoose
  .connect(process.env.db_url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

app.listen(port, () => console.log(`Server started at port: ${port}`));

app.get("/", (req, res) => {
  res.send("Welcome to Cubing Kerala")
})
