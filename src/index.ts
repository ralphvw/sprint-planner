import express from "express";
import { db } from "./config/db";
import routes from "./routes/index";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/", routes);
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
