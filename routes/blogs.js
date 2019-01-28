// Imports
const endpoints = require("./constants");
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

const createHandler = (req, res) => {
  let blogPost = new Blog();
  const { id, title, body } = req.body;
  blogPost.id = id;
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
  const { id, title, body } = req.body;

  Blog.findOneAndUpdate(
    { id: id },
    { $set: { title: title, body: body } },
    err => {
      if (err) {
        return res.json({ success: false, error: err });
      }
      return res.json({ success: true });
    }
  );
};

const deleteHandler = (req, res) => {
  const { id } = req.body;

  Blog.findOneAndDelete({ id: id }, err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

// Setting routes
router.get(endpoints.DB_API_GET, getHandler);
router.post(endpoints.DB_API_CREATE, createHandler);
router.delete(endpoints.DB_API_DELETE, deleteHandler);
router.post(endpoints.DB_API_UPDATE, updateHandler);

module.exports = router;
