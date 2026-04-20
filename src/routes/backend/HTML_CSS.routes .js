const express = require("express");
const route = express.Router();
const HTML_CSSController = require("../../controllers/backend/HTML_CSS.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), HTML_CSSController.create); //http://localhost:5000/api/backend/HTML_CSS/add

  route.post("/view", upload.none(), HTML_CSSController.view); //http://localhost:5000/api/backend/HTML_CSS/view

  route.post("/details/:id", upload.none(), HTML_CSSController.details); // http://localhost:5000/api/backend/HTML_CSS/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    HTML_CSSController.update,
  ); // http://localhost:5000/api/backend/HTML_CSS/update

  route.put("/change-status", upload.none(), HTML_CSSController.changeStatus); // http://localhost:5000/api/backend/HTML_CSS/change-status

  route.delete("/delete/:id", upload.none(), HTML_CSSController.delete); //http://localhost:5000/api/backend/HTML_CSS/delete

  route.delete(
    "/delete-image",
    upload.none(),
    HTML_CSSController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/HTML_CSS/delete-image

  app.use("/api/backend/HTML_CSS", route);
};
