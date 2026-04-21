const express = require("express");
const route = express.Router();
const SQLController = require("../../controllers/backend/SQL.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), SQLController.create); //http://localhost:5000/api/backend/SQL/add

  route.post("/view", upload.none(), SQLController.view); //http://localhost:5000/api/backend/SQL/view

  route.post("/details/:id", upload.none(), SQLController.details); // http://localhost:5000/api/backend/SQL/details

  route.put("/update/:id", upload.array("images", 10), SQLController.update); // http://localhost:5000/api/backend/SQL/update

  route.put("/change-status", upload.none(), SQLController.changeStatus); // http://localhost:5000/api/backend/SQL/change-status

  route.delete("/delete/:id", upload.none(), SQLController.delete); //http://localhost:5000/api/backend/SQL/delete
  route.delete("/delete-image", upload.none(), SQLController.deleteSingleImage);

  route.post("/multiple-delete", upload.none(), SQLController.multipleDelete);

  app.use("/api/backend/SQL", route);
};
//http://localhost:5000/api/backend/SQL/add
//http://localhost:5000/api/backend/SQL/view
//http://localhost:5000/api/backend/SQL/details/:id
//http://localhost:5000/api/backend/SQL/update/:id
//http://localhost:5000/api/backend/SQL/change-status
//http://localhost:5000/api/backend/SQL/delete/:id
//http://localhost:5000/api/backend/SQL/multiple-delete
//http://localhost:5000/api/backend/SQL/delete-image
