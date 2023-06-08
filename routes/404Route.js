const express = require("express");
const newRouter = express.Router();

const handler = (req, res) => {
    res.status(404).json({ msg: "Please use /sendMsg" });
};

newRouter.route("*").get(handler).post(handler).put(handler).delete(handler);

module.exports = newRouter;
