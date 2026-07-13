const express = require("express");
const fileRouter = express.Router();

const auth = require("../Middlewares/authMiddleware")
const upload = require("../Middlewares/multerMiddleware")

const {uploadFile} = require("../Controllers/fileController")

fileRouter.post("/upload",auth, upload.single("file"), uploadFile)

module.exports = fileRouter;