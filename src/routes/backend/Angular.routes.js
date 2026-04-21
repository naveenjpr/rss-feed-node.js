const express = require("express");
const route = express.Router();
const angularController = require("../../controllers/backend/Angular.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), angularController.create); //http://localhost:5000/api/backend/angular/add

  route.post("/view", upload.none(), angularController.view); //http://localhost:5000/api/backend/angular/view

  route.post("/details/:id", upload.none(), angularController.details); // http://localhost:5000/api/backend/angular/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    angularController.update,
  ); // http://localhost:5000/api/backend/angular/update

  route.put("/change-status", upload.none(), angularController.changeStatus); // http://localhost:5000/api/backend/angular/change-status

  route.delete("/delete/:id", upload.none(), angularController.delete); //http://localhost:5000/api/backend/angular/delete
  route.delete(
    "/delete-image",
    upload.none(),
    angularController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/angular/delete-image
  route.post(
    "/multiple-delete",
    upload.none(),
    angularController.multipleDelete,
  );

  app.use("/api/backend/angular", route);
};
