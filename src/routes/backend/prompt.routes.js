const express = require("express");
const route = express.Router();
const promptController = require("../../controllers/backend/prompt.controller");
const upload = require("../../config/upload");


module.exports = (app) => {
  route.post("/add", upload.single("image"), promptController.create); //http://localhost:5000/api/backend/prompt/add

  route.post("/view", upload.none(), promptController.view); //http://localhost:5000/api/backend/prompt/view

  route.post("/details/:id", upload.none(), promptController.details); // http://localhost:5000/api/backend/prompt/details

  route.put("/update/:id", upload.single("image"), promptController.update); // http://localhost:5000/api/backend/prompt/update

  route.put(
    "/change-status",
    upload.none(),
    promptController.changeStatus,
  ); // http://localhost:5000/api/backend/prompt/change-status

  route.delete("/delete/:id", upload.none(), promptController.delete); //http://localhost:5000/api/backend/prompt/delete

  route.post(
    "/multiple-delete",
    upload.none(),
    promptController.multipleDelete,
  );

  app.use("/api/backend/prompt", route);
};
//http://localhost:5000/api/backend/prompt/add
//http://localhost:5000/api/backend/prompt/view
//http://localhost:5000/api/backend/prompt/details/:id
//http://localhost:5000/api/backend/prompt/update/:id
//http://localhost:5000/api/backend/prompt/change-status
//http://localhost:5000/api/backend/prompt/delete/:id
//http://localhost:5000/api/backend/prompt/multiple-delete
