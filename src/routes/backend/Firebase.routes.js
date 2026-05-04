const express = require("express");
const route = express.Router();
const FirebaseController = require("../../controllers/backend/Firebase.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), FirebaseController.create);
  //http://localhost:5000/api/backend/Firebase/add

  route.post("/view", upload.none(), FirebaseController.view); //http://localhost:5000/api/backend/Firebase/view

  route.post("/details/:id", upload.none(), FirebaseController.details); // http://localhost:5000/api/backend/Firebase/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    FirebaseController.update,
  ); // http://localhost:5000/api/backend/Firebase/update

  route.put("/change-status", upload.none(), FirebaseController.changeStatus); // http://localhost:5000/api/backend/Firebase/change-status

  route.delete("/delete/:id", upload.none(), FirebaseController.delete); //http://localhost:5000/api/backend/Firebase/delete
  route.delete(
    "/delete-image",
    upload.none(),
    FirebaseController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Firebase/delete-image

  app.use("/api/backend/Firebase", route);
};
