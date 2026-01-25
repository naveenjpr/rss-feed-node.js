const express = require("express");
const route = express.Router();
const DockerController = require("../../controllers/backend/Docker.controller");
const multer = require("multer");
const upload = multer();

module.exports = (app) => {
  route.post("/add", upload.none(), DockerController.create); //http://localhost:5000/api/backend/Docker/add

  route.post("/view", upload.none(), DockerController.view); //http://localhost:5000/api/backend/Docker/view

  route.post("/details/:id", upload.none(), DockerController.details); // http://localhost:5000/api/backend/Docker/details

  route.put("/update/:id", upload.none(), DockerController.update); // http://localhost:5000/api/backend/Docker/update

  route.put("/change-status", upload.none(), DockerController.changeStatus); // http://localhost:5000/api/backend/Docker/change-status

  route.delete("/delete/:id", upload.none(), DockerController.delete); //http://localhost:5000/api/backend/Docker/delete

  app.use("/api/backend/Docker", route);
};
