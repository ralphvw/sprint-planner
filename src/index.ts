import express from "express";
import { db } from "./config/db";

const app = express();
const PORT = process.env.PORT || 4000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.info("Server ready at port: ", PORT);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
