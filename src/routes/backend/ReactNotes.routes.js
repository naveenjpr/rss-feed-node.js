const express = require("express");
const route = express.Router();
const ReactNotesController = require("../../controllers/backend/ReactNotes.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), ReactNotesController.create); //http://localhost:5000/api/backend/ReactNotes/add

  route.post("/view", upload.none(), ReactNotesController.view); //http://localhost:5000/api/backend/ReactNotes/view

  route.post("/details/:id", upload.none(), ReactNotesController.details); // http://localhost:5000/api/backend/ReactNotes/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    ReactNotesController.update,
  ); // http://localhost:5000/api/backend/ReactNotes/update

  route.put("/change-status", upload.none(), ReactNotesController.changeStatus); // http://localhost:5000/api/backend/ReactNotes/change-status

  route.delete("/delete/:id", upload.none(), ReactNotesController.delete); //http://localhost:5000/api/backend/ReactNotes/delete

  route.delete(
    "/delete-image",
    upload.none(),
    ReactNotesController.deleteSingleImage,
  ); //http://localhost:5000/api/backend/ReactNotes/delete-image

  app.use("/api/backend/ReactNotes", route);
};
