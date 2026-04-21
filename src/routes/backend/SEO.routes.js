const express = require("express");
const route = express.Router();
const SEOController = require("../../controllers/backend/SEO.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), SEOController.create); //http://localhost:5000/api/backend/SEO/add

  route.post("/view", upload.none(), SEOController.view); //http://localhost:5000/api/backend/SEO/view

  route.post("/details/:id", upload.none(), SEOController.details); // http://localhost:5000/api/backend/SEO/details

  route.put("/update/:id", upload.array("images", 10), SEOController.update); // http://localhost:5000/api/backend/SEO/update

  route.put("/change-status", upload.none(), SEOController.changeStatus); // http://localhost:5000/api/backend/SEO/change-status

  route.delete("/delete/:id", upload.none(), SEOController.delete); //http://localhost:5000/api/backend/SEO/delete
  route.delete("/delete-image", upload.none(), SEOController.deleteSingleImage);
  //http://localhost:5000/api/backend/SEO/delete-image
  app.use("/api/backend/SEO", route);
};
//http://localhost:5000/api/backend/SEO/add
//http://localhost:5000/api/backend/SEO/view
//http://localhost:5000/api/backend/SEO/details/:id
//http://localhost:5000/api/backend/SEO/update/:id
//http://localhost:5000/api/backend/SEO/change-status
//http://localhost:5000/api/backend/SEO/delete/:id
//http://localhost:5000/api/backend/SEO/multiple-delete
