import express from "express";
const app = express();
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

process.on ('uncaughtException' ,(err) => {
  console.log(`ERROR: ${err}`);
  console.log ("Shutting down server due to Uncaught exception");
  process.exit(1);
});

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

app.use(express.json());


import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

//use of middle ware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

process.on('unhandledRejection', (err) =>{
  console.log(`ERROR: ${err}`);
  console.log ("Shutting down server due to Unhandled Promise Rejection");
  server. close( ( ) =>{
      process.exit(1);
  });
})