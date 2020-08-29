const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const Post = require("../models/Post");

router.post(
  "/",
  [
    check("title", "Enter a Valid Title").not().isEmpty().trim().escape(),
    check("content", "Enter a Valid Post Content")
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  async (req, res) => {
    let checkPost = await Post.findOne({
      title: req.body.title,
    });
    if (checkPost) {
      return res
        .status(400)
        .json({ errors: { title: { msg: "Post Already Exist" } } });
    }
    try {
      let postObj = {};
      if (req.body.title) postObj.title = req.body.title;
      if (req.body.content) postObj.content = req.body.content;

      let post = new Post(postObj);
      await post.save();
      res.json({ success: true, post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find();
    if (!posts) {
      return res.status(404).json({ msg: "No Posts Were Posted Yet" });
    }
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
