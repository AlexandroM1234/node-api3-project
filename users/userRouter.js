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
  Users.insert(newPost)
    .then((posts) => {
      if (!text) {
        res.status(400).json({ message: "please insert text" });
      } else if (!user_id) {
        res.status(400).json({ message: "userID is not specified" });
      } else if (posts) {
        res.status(201).json(posts);
      } else {
        res.status(500).json({ message: "error sending data to database" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.log("error getting data from database", err);
      res.status(500).json({ error: "error retrieving data" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else if (!post) {
        res.status(404).json({ message: "post could not be found" });
      } else {
        res.status(500).json({ error: "post info could not be retrieved" });
      }
    })
    .catch((err) => {
      console.log("error getting via ID", err);
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  Users.getUserPosts()
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else if (!posts) {
        res.status(404).json({ error: "posts with that ID dont exists" });
      } else {
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." });
      }
    })
    .catch((err) => {
      console.log("error getting user posts", err);
    });
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
