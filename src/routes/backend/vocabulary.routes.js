const express = require("express");
const route = express.Router();
const vocabularyController = require("../../controllers/backend/vocabulary.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), vocabularyController.create);
  //http://localhost:5000/api/backend/vocabulary/add

  route.post("/view", upload.none(), vocabularyController.view); //http://localhost:5000/api/backend/vocabulary/view

  route.post("/details/:id", upload.none(), vocabularyController.details); // http://localhost:5000/api/backend/vocabulary/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    vocabularyController.update,
  ); // http://localhost:5000/api/backend/vocabulary/update

  route.put("/change-status", upload.none(), vocabularyController.changeStatus); // http://localhost:5000/api/backend/vocabulary/change-status

  route.delete("/delete/:id", upload.none(), vocabularyController.delete); //http://localhost:5000/api/backend/vocabulary/delete
  route.delete(
    "/delete-image",
    upload.none(),
    vocabularyController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/vocabulary/delete-image

  app.use("/api/backend/vocabulary", route);
};
