const express = require("express");
const route = express.Router();
const ReduxToolkitController = require("../../controllers/backend/ReduxToolkit.controller");
const multer = require("multer");
const upload = multer();

module.exports = (app) => {
  route.post("/add", upload.none(), ReduxToolkitController.create); //http://localhost:5000/api/backend/ReduxToolkit/add

  route.post("/view", upload.none(), ReduxToolkitController.view); //http://localhost:5000/api/backend/ReduxToolkit/view

  route.post("/details/:id", upload.none(), ReduxToolkitController.details); // http://localhost:5000/api/backend/ReduxToolkit/details

  route.put("/update/:id", upload.none(), ReduxToolkitController.update); // http://localhost:5000/api/backend/ReduxToolkit/update

  route.put(
    "/change-status",
    upload.none(),
    ReduxToolkitController.changeStatus,
  ); // http://localhost:5000/api/backend/ReduxToolkit/change-status

  route.delete("/delete/:id", upload.none(), ReduxToolkitController.delete); //http://localhost:5000/api/backend/ReduxToolkit/delete

  route.post(
    "/multiple-delete",
    upload.none(),
    ReduxToolkitController.multipleDelete,
  );

  app.use("/api/backend/ReduxToolkit", route);
};
//http://localhost:5000/api/backend/ReduxToolkit/add
//http://localhost:5000/api/backend/ReduxToolkit/view
//http://localhost:5000/api/backend/ReduxToolkit/details/:id
//http://localhost:5000/api/backend/ReduxToolkit/update/:id
//http://localhost:5000/api/backend/ReduxToolkit/change-status
//http://localhost:5000/api/backend/ReduxToolkit/delete/:id
//http://localhost:5000/api/backend/ReduxToolkit/multiple-delete
