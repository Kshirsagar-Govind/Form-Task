const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require("cors");
const routers = require("./routes");
dotenv.config();
const PORT = process.env.PORT || 5500;
mongoose.connect(
    process.env.DATABASE_ACCESS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, useFindAndModify: false
    },
    () => console.log("+ Database is Connected Successfully...")
);


app.use(express.json());
app.use(cors());
app.use(routers);
app.listen(PORT, () => console.log(`+ SERVER IS RUNNING ON ${PORT}`))