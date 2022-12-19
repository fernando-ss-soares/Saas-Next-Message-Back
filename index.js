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

const db_user = process.env.SECRET_DB_USER
const db_pass = process.env.SECRET_DB_PASS

mongoose.set('strictQuery', false).connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.tlgvyak.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(8000);
})
.catch((error) => {
    console.log(error);
})