const express = require("express");
const route = express.Router();
const phpController = require("../../controllers/backend/php.controller.js");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), phpController.create);
  //http://localhost:5000/api/backend/php/add

  route.post("/view", upload.none(), phpController.view); //http://localhost:5000/api/backend/php/view

  route.post("/details/:id", upload.none(), phpController.details); // http://localhost:5000/api/backend/php/details

  route.put("/update/:id", upload.array("images", 10), phpController.update); // http://localhost:5000/api/backend/php/update

  route.put("/change-status", upload.none(), phpController.changeStatus); // http://localhost:5000/api/backend/php/change-status

  route.delete("/delete/:id", upload.none(), phpController.delete); //http://localhost:5000/api/backend/php/delete
  route.delete("/delete-image", upload.none(), phpController.deleteSingleImage);
  //http://localhost:5000/api/backend/php/delete-image

  app.use("/api/backend/php", route);
};
