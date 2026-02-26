import "dotenv/config"
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./routes/router.js";
import { errorHandlingMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
const port = Number(process.env.PORT) || 3002;

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use('/', router);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on Port ${port}`);
    });
});
app.use((req, _res, next) => {
  console.log("here", req.method, req.url);
  next();
});

app.use(errorHandlingMiddleware)