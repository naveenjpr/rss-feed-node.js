const express = require("express");
const route = express.Router();
const livewebsiteController = require("../../controllers/backend/livewebsite.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), livewebsiteController.create); //http://localhost:5000/api/backend/livewebsite/add

  route.post("/view", upload.none(), livewebsiteController.view); //http://localhost:5000/api/backend/livewebsite/view

  route.post("/details/:id", upload.none(), livewebsiteController.details); // http://localhost:5000/api/backend/livewebsite/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    livewebsiteController.update,
  ); // http://localhost:5000/api/backend/livewebsite/update

  route.put(
    "/change-status",
    upload.none(),
    livewebsiteController.changeStatus,
  ); // http://localhost:5000/api/backend/livewebsite/change-status

  route.delete("/delete/:id", upload.none(), livewebsiteController.delete); //http://localhost:5000/api/backend/livewebsite/delete

  route.delete(
    "/delete-image",
    upload.none(),
    livewebsiteController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/livewebsite/delete-image

  route.post(
    "/multiple-delete",
    upload.none(),
    livewebsiteController.multipleDelete,
  );

  app.use("/api/backend/livewebsite", route);
};
