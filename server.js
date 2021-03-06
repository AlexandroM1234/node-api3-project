const express = require("express");
const userRouter = require("./users/userRouter");
const server = express();

// middleware
server.use(logger);

server.use(express.json());

server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.origninalUrl}`);
  next();
}

module.exports = server;
