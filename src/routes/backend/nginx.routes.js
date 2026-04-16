const express = require("express");
const route = express.Router();
const nginxController = require("../../controllers/backend/nginx.controller");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), nginxController.create);

  //http://localhost:5000/api/backend/nginx/add

  route.post("/view", upload.none(), nginxController.view); //http://localhost:5000/api/backend/nginx/view

  route.post("/details/:id", upload.none(), nginxController.details); // http://localhost:5000/api/backend/nginx/details

  route.put("/update/:id", upload.array("images", 10), nginxController.update);
  // http://localhost:5000/api/backend/nginx/update

  route.put("/change-status", upload.none(), nginxController.changeStatus); // http://localhost:5000/api/backend/nginx/change-status

  route.delete("/delete/:id", upload.none(), nginxController.delete); //http://localhost:5000/api/backend/nginx/delete

  route.delete(
    "/delete-image",
    upload.none(),
    nginxController.deleteSingleImage,
  );
  // http://localhost:5000/api/backend/nginx/delete-image

  //   route.post("/multiple-delete", upload.none(), nginxController.multipleDelete);

  app.use("/api/backend/nginx", route);
};
//http://localhost:5000/api/backend/nginx/add
//http://localhost:5000/api/backend/nginx/view
//http://localhost:5000/api/backend/nginx/details/:id
//http://localhost:5000/api/backend/nginx/update/:id
//http://localhost:5000/api/backend/nginx/change-status
//http://localhost:5000/api/backend/nginx/delete/:id
//http://localhost:5000/api/backend/nginx/delete-image
//http://localhost:5000/api/backend/nginx/multiple-delete
