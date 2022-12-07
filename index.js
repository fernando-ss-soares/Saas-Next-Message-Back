import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./routes/user.js";
dotenv.config();

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({
    extended: true
}))

morganBody(app);

app.use('/login', auth);

mongoose.set('strictQuery', false).connect(`mongodb://localhost:27017/next-message-db?retryWrites=true&w=majority`)
.then(() => {
    app.listen(8000);
})
.catch((error) => {
    console.log(error);
})