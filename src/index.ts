import "dotenv/config";

import express from "express";
import UserController from "./controllers/user.js";
import BookController from "./controllers/book.js";

const app = express();

app.use(express.json());

app.use("/users", UserController);
app.use("/books", BookController);

app.listen(3000, () => console.log("Server running on port 3000"));
