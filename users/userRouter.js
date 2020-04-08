const express = require("express");
const Users = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
  const { name } = req.body;
  Users.insert(req.body)
    .then((newUser) => {
      if (!name) {
        res.status(400).json({ error: "missing name" });
      } else if (!newUser) {
        res.status(400).json({ error: "input user content" });
      } else if (newUser) {
        res.status(401).json(newUser);
      } else {
        res.status(500).json({ err: "big mess up" });
      }
    })
    .catch((err) => {
      console.log("you messed up adding a new post", err);
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
  const newPost = req.body;
  const { text, user_id } = req.body;
  Users.insert();
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(id) {
  return function (req, res, next) {
    if (id) {
      res.json({ ...req.user, id });
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  };
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!req.body) {
    res.status(400).res.json({ message: "missing user data" });
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(201).json(req.body);
    next();
  }
}

function validatePost(req, res, next) {
  const { body } = req;
  const { text } = req.body;
  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    res.status(201).json(body);
  }
}

module.exports = router;
