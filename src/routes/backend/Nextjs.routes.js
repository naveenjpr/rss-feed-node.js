const express = require("express");
const route = express.Router();
const NextjsController = require("../../controllers/backend/Nextjs.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), NextjsController.create); //http://localhost:5000/api/backend/Nextjs/add

  route.post("/view", upload.none(), NextjsController.view); //http://localhost:5000/api/backend/Nextjs/view

  route.post("/details/:id", upload.none(), NextjsController.details); // http://localhost:5000/api/backend/Nextjs/details

  route.put("/update/:id", upload.array("images", 10), NextjsController.update); // http://localhost:5000/api/backend/Nextjs/update

  route.put("/change-status", upload.none(), NextjsController.changeStatus); // http://localhost:5000/api/backend/Nextjs/change-status

  route.delete("/delete/:id", upload.none(), NextjsController.delete); //http://localhost:5000/api/backend/Nextjs/delete
  route.delete(
    "/delete-image",
    upload.none(),
    NextjsController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Nextjs/delete-image
  route.post(
    "/multiple-delete",
    upload.none(),
    NextjsController.multipleDelete,
  );

  app.use("/api/backend/Nextjs", route);
};
