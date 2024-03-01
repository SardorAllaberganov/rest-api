// initializing app in express js
const express = require("express");
const app = express();

//connecting mongoose
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT;
const compass_mongo_db = process.env.MONGO_DB_COMPASS;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const subscribersRouter = require("./router/subscribers");
app.use("/subscribers", subscribersRouter);

mongoose
    .connect(compass_mongo_db)
    .then((result) => {
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server started at PORT: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
