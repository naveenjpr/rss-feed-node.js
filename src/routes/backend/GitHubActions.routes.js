const express = require("express");
const route = express.Router();
const GitHubActionsController = require("../../controllers/backend/GitHubActions.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post(
    "/add",
    upload.array("images", 10),
    GitHubActionsController.create,
  ); //http://localhost:5000/api/backend/GitHubActions/add

  route.post("/view", upload.none(), GitHubActionsController.view); //http://localhost:5000/api/backend/GitHubActions/view

  route.post("/details/:id", upload.none(), GitHubActionsController.details); // http://localhost:5000/api/backend/GitHubActions/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    GitHubActionsController.update,
  ); // http://localhost:5000/api/backend/GitHubActions/update

  route.put(
    "/change-status",
    upload.none(),
    GitHubActionsController.changeStatus,
  ); // http://localhost:5000/api/backend/GitHubActions/change-status

  route.delete("/delete/:id", upload.none(), GitHubActionsController.delete); //http://localhost:5000/api/backend/GitHubActions/delete
  route.delete(
    "/delete-image",
    upload.none(),
    GitHubActionsController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/GitHubActions/delete-image
  route.post(
    "/multiple-delete",
    upload.none(),
    GitHubActionsController.multipleDelete,
  );

  app.use("/api/backend/GitHubActions", route);
};
//http://localhost:5000/api/backend/GitHubActions/add
//http://localhost:5000/api/backend/GitHubActions/view
//http://localhost:5000/api/backend/GitHubActions/details/:id
//http://localhost:5000/api/backend/GitHubActions/update/:id
//http://localhost:5000/api/backend/GitHubActions/change-status
//http://localhost:5000/api/backend/GitHubActions/delete/:id
//http://localhost:5000/api/backend/GitHubActions/multiple-delete
