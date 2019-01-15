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
  Blog.find((err, data) => res.json({ success: true, data: data }));
};

const postHandler = (req, res) => {
  res.send("POST handler for /blogs route");
};

const updateHandler = (req, res) => {
  res.send("UPDATE handler for /blogs route");
};

const deleteHandler = (req, res) => {
  res.send("DELETE handler for /blogs route");
};

// Setting routes
router.get(DB_API_GET, getHandler);
router.post(DB_API_CREATE, postHandler);
router.delete(DB_API_DELETE, deleteHandler);
router.post(DB_API_UPDATE, updateHandler);

module.exports = router;
