import express from "express";
import cors from "cors";
import morganBody from "morgan-body";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import auth from "./routes/user.js";
import usersSearch from "./routes/search.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.status(200).json({
        'Message':'API Funcionando!'
    })
})

morganBody(app);

app.use('/login', auth);
app.use('/users/search', usersSearch);

mongoose.set('strictQuery', false).connect(`mongodb://localhost:27017/next-message-db?retryWrites=true&w=majority`)
.then(() => {
    app.listen(8000);
})
.catch((error) => {
    console.log(error);
})