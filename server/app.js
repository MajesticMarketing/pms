import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
import cookieParser from "cookie-parser";

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "100mb" })); //Init body-parser middleware
app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);
app.use("/api/user", userRoute);

export default app;
