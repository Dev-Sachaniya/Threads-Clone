import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoute.js";
import postRoute from "./Routes/postRoute.js";
const app = express();

dotenv.config();
connectDB();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app runnig on port ${PORT}`);
});
