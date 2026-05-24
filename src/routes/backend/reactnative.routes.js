const express = require("express");
const route = express.Router();
const reactnativeController = require("../../controllers/backend/reactnative.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), reactnativeController.create); //http://localhost:5000/api/backend/reactnative/add

  route.post("/view", upload.none(), reactnativeController.view); //http://localhost:5000/api/backend/reactnative/view

  route.post("/details/:id", upload.none(), reactnativeController.details); // http://localhost:5000/api/backend/reactnative/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    reactnativeController.update,
  ); // http://localhost:5000/api/backend/reactnative/update

  route.put(
    "/change-status",
    upload.none(),
    reactnativeController.changeStatus,
  ); // http://localhost:5000/api/backend/reactnative/change-status

  route.delete("/delete/:id", upload.none(), reactnativeController.delete); //http://localhost:5000/api/backend/reactnative/delete

  route.delete(
    "/delete-image",
    upload.none(),
    reactnativeController.deleteSingleImage,
  ); //http://localhost:5000/api/backend/reactnative/delete-image

  app.use("/api/backend/reactnative", route);
};
