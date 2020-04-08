// code away!
const express = require("express");
const userRouter = require("./users/userRouter");
const server = express();

server.use(express.json());
server.user("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;

server.listen(4000, () => {
  console.log("\n=== Server is Running on Port 4000 ===\n");
});

//custom middleware
