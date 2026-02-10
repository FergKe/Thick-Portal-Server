import "dotenv/config"
import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/router.js";
import { errorHandlingMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
const port = Number(process.env.PORT) || 3002;

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

// app.use((
//     error: unknown,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) => {

//     if (error instanceof AppError) {
//         return res.status( error.statusCode ).json({
//             ok:false,
//             error: error.message,
//             ...( process.env.NODE_ENV === 'development' && { stack: error.stack} )
//         });
//     }

//     console.error("Unhandled error: ", error)

//     return res.status(500).json({
//         ok: false,
//         error: "Internal Server Error",
//         ...(process.env.NODE_ENV === 'development' &&
//             error instanceof Error && { stack: error.stack} )
//     });
// });
