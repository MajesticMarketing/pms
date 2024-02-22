import dotenv from "dotenv";
import morgan from "morgan";
import app from "./app.js";
import { connectDatabase } from "./config/connectDatabase.js";
import { pageNotFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config({
  path: "./config/.env",
});
const PORT = process.env.PORT;
connectDatabase();
app.use(morgan("dev"));

// not found error
app.use(pageNotFound);

// error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
console.clear(); //Clear the terminal
