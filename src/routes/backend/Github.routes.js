const express = require("express");
const route = express.Router();
const GithubController = require("../../controllers/backend/Github.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), GithubController.create); //http://localhost:5000/api/backend/Github/add

  route.post("/view", upload.none(), GithubController.view); //http://localhost:5000/api/backend/Github/view

  route.post("/details/:id", upload.none(), GithubController.details); // http://localhost:5000/api/backend/Github/details

  route.put("/update/:id", upload.array("images", 10), GithubController.update); // http://localhost:5000/api/backend/Github/update

  route.put("/change-status", upload.none(), GithubController.changeStatus); // http://localhost:5000/api/backend/Github/change-status

  route.delete("/delete/:id", upload.none(), GithubController.delete); //http://localhost:5000/api/backend/Github/delete
  route.delete(
    "/delete-image",
    upload.none(),
    GithubController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Github/delete-image
  route.post(
    "/multiple-delete",
    upload.none(),
    GithubController.multipleDelete,
  );

  app.use("/api/backend/Github", route);
};
//http://localhost:5000/api/backend/Github/add
//http://localhost:5000/api/backend/Github/view
//http://localhost:5000/api/backend/Github/details/:id
//http://localhost:5000/api/backend/Github/update/:id
//http://localhost:5000/api/backend/Github/change-status
//http://localhost:5000/api/backend/Github/delete/:id
//http://localhost:5000/api/backend/Github/multiple-delete
