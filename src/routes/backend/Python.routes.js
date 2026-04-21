const express = require("express");
const route = express.Router();
const PythonController = require("../../controllers/backend/Python.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), PythonController.create); //http://localhost:5000/api/backend/Python-Notes/add

  route.post("/view", upload.none(), PythonController.view); //http://localhost:5000/api/backend/Python-Notes/view

  route.post("/details/:id", upload.none(), PythonController.details); // http://localhost:5000/api/backend/Python-Notes/details

  route.put("/update/:id", upload.array("images", 10), PythonController.update); // http://localhost:5000/api/backend/Python-Notes/update

  route.put("/change-status", upload.none(), PythonController.changeStatus); // http://localhost:5000/api/backend/Python-Notes/change-status

  route.delete("/delete/:id", upload.none(), PythonController.delete); //http://localhost:5000/api/backend/Python-Notes/delete
  route.delete(
    "/delete-image",
    upload.none(),
    PythonController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Python-Notes/delete-image
  route.post(
    "/multiple-delete",
    upload.none(),
    PythonController.multipleDelete,
  );

  app.use("/api/backend/Python-Notes", route);
};
