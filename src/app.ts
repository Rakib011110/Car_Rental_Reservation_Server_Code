import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());

//  application routes
// app.use('/api/v1/);
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/", getTest);

// Error handlers (to be created)
import globalErrorHandler from "../src/app/middlewares/errorHandler";
import notFoundHandler from "../src/app/middlewares/notFoundHandler";

app.use(globalErrorHandler);
app.use(notFoundHandler);

// app.use(globalErrorHandler);
// app.use(notFoundError);

export default app;
