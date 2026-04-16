const express = require("express");
const route = express.Router();
const AWSController = require("../../controllers/backend/AWS.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 5), AWSController.create); //http://localhost:5000/api/backend/AWS/add

  route.post("/view", upload.none(), AWSController.view); //http://localhost:5000/api/backend/AWS/view

  route.post("/details/:id", upload.none(), AWSController.details); // http://localhost:5000/api/backend/AWS/details

  route.put("/update/:id", upload.array("images", 5), AWSController.update); // http://localhost:5000/api/backend/AWS/update

  route.put("/change-status", upload.none(), AWSController.changeStatus); // http://localhost:5000/api/backend/AWS/change-status

  route.delete("/delete/:id", upload.none(), AWSController.delete); //http://localhost:5000/api/backend/AWS/delete

  route.delete("/delete-image", upload.none(), AWSController.deleteSingleImage);

  app.use("/api/backend/AWS", route);
};
//http://localhost:5000/api/backend/AWS/add
//
//http://localhost:5000/api/backend/AWS/view
