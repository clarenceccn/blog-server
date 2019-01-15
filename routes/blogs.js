// static const database endpoints
const DB_API_GET = "/api/get";
const DB_API_CREATE = "/api/post";
const DB_API_DELETE = "/api/delete";
const DB_API_UPDATE = "/api/update";

// Imports
const express = require("express");
const router = express.Router();
const Blog = require("../schemas/blog");

// Route handlers
const getHandler = (req, res) => {
  Blog.find((err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ success: true, data: data });
  });
};

const postHandler = (req, res) => {
  let blogPost = new Blog();
  const { title, body } = req.body;
  blogPost.title = title;
  blogPost.body = body;

  blogPost.save(err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

const updateHandler = (req, res) => {
  const { title, body } = req.body;

  Blog.findOneAndUpdate((title, body, err) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

const deleteHandler = (req, res) => {
  const { id } = req.body;

  Blog.findOneAndDelete((id, err) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

// Setting routes
router.get(DB_API_GET, getHandler);
router.post(DB_API_CREATE, postHandler);
router.delete(DB_API_DELETE, deleteHandler);
router.post(DB_API_UPDATE, updateHandler);

module.exports = router;