const express = require("express");
const route = express.Router();
const TestingController = require("../../controllers/backend/Testing.controller");
const multer = require("multer");
const upload = multer();

module.exports = (app) => {
  route.post("/add", upload.none(), TestingController.create); //http://localhost:5000/api/backend/Testing/add

  route.post("/view", upload.none(), TestingController.view); //http://localhost:5000/api/backend/Testing/view

  route.post("/details/:id", upload.none(), TestingController.details); // http://localhost:5000/api/backend/Testing/details

  route.put("/update/:id", upload.none(), TestingController.update); // http://localhost:5000/api/backend/Testing/update

  route.put("/change-status", upload.none(), TestingController.changeStatus); // http://localhost:5000/api/backend/Testing/change-status

  route.delete("/delete/:id", upload.none(), TestingController.delete); //http://localhost:5000/api/backend/Testing/delete

  app.use("/api/backend/Testing", route);
};
