const express = require("express");
const route = express.Router();
const angularController = require("../../controllers/backend/angular.controller");
const multer = require("multer");
const upload = multer();

module.exports = (app) => {
  route.post("/add", upload.none(), angularController.create); //http://localhost:5000/api/backend/angular/add

  route.post("/view", upload.none(), angularController.view); //http://localhost:5000/api/backend/angular/view

  route.post("/details/:id", upload.none(), angularController.details); // http://localhost:5000/api/backend/angular/details

  route.put("/update/:id", upload.none(), angularController.update); // http://localhost:5000/api/backend/angular/update

  route.put("/change-status", upload.none(), angularController.changeStatus); // http://localhost:5000/api/backend/angular/change-status

  route.delete("/delete/:id", upload.none(), angularController.delete); //http://localhost:5000/api/backend/angular/delete

  route.post(
    "/multiple-delete",
    upload.none(),
    angularController.multipleDelete
  );

  app.use("/api/backend/angular", route);
};
