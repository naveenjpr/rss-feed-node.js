const express = require("express");
const route = express.Router();
const MenkaController = require("../../controllers/backend/Menka.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), MenkaController.create); //http://localhost:5000/api/backend/Menka/add

  route.post("/view", upload.none(), MenkaController.view); //http://localhost:5000/api/backend/Menka/view

  route.post("/details/:id", upload.none(), MenkaController.details); // http://localhost:5000/api/backend/Menka/details

  route.put("/update/:id", upload.array("images", 10), MenkaController.update); // http://localhost:5000/api/backend/Menka/update

  route.put("/change-status", upload.none(), MenkaController.changeStatus); // http://localhost:5000/api/backend/Menka/change-status

  route.delete("/delete/:id", upload.none(), MenkaController.delete); //http://localhost:5000/api/backend/Menka/delete

  route.post("/multiple-delete", upload.none(), MenkaController.multipleDelete);
  route.delete(
    "/delete-image",
    upload.none(),
    MenkaController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Menka/delete-image

  app.use("/api/backend/Menka", route);
};
