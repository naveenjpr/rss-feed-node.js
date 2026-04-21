const express = require("express");
const route = express.Router();
const EnglishController = require("../../controllers/backend/English.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), EnglishController.create); //http://localhost:5000/api/backend/English/add

  route.post("/view", upload.none(), EnglishController.view); //http://localhost:5000/api/backend/English/view

  route.post("/details/:id", upload.none(), EnglishController.details); // http://localhost:5000/api/backend/English/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    EnglishController.update,
  ); // http://localhost:5000/api/backend/English/update

  route.put("/change-status", upload.none(), EnglishController.changeStatus); // http://localhost:5000/api/backend/English/change-status

  route.delete("/delete/:id", upload.none(), EnglishController.delete); //http://localhost:5000/api/backend/English/delete

  route.post(
    "/multiple-delete",
    upload.none(),
    EnglishController.multipleDelete,
  );
  route.delete(
    "/delete-image",
    upload.none(),
    EnglishController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/English/delete-image
  app.use("/api/backend/English", route);
};
