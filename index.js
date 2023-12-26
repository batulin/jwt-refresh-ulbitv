const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./router/index');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`api server ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();