const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ extended: true }));
const messageRoute = require("./routes/messageRoute");
const _404Route = require("./routes/404Route");

app.use("/sendMsg", messageRoute);
app.use("/*", _404Route);

app.listen("3000", (error) => {
    if (error) {
        console.log("ServerError: Not Connected: ", error);
    } else {
        console.log("Connected to server on port 3000");
    }
});

module.exports = app;
