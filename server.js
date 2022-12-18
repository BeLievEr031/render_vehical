import express from "express";
import path from "path";
import * as url from "url";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import vehicalRouter from "./routes/vehicalRouter.js";
dotenv.config();
const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"), function (err) {
    res.status(500).send(err);
  });
});
// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/vehical", vehicalRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  dbConnect();
  console.log("Connected to the server " + PORT);
});
