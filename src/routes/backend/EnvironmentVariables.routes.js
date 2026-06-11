const express = require("express");
const route = express.Router();
const EnvironmentVariablesController = require("../../controllers/backend/EnvironmentVariables.controller");
const upload = require("../../config/upload");
const multer = require("multer");

module.exports = (app) => {
    route.post("/add", upload.array("images", 10), EnvironmentVariablesController.create); //http://localhost:5000/api/backend/EnvironmentVariables/add

    route.post("/view", upload.none(), EnvironmentVariablesController.view); //http://localhost:5000/api/backend/EnvironmentVariables/view

    route.post("/details/:id", upload.none(), EnvironmentVariablesController.details); // http://localhost:5000/api/backend/EnvironmentVariables/details

    route.put("/update/:id", upload.array("images", 10), EnvironmentVariablesController.update); // http://localhost:5000/api/backend/EnvironmentVariables/update

    route.put(
        "/change-status",
        upload.none(),
        EnvironmentVariablesController.changeStatus,
    ); // http://localhost:5000/api/backend/EnvironmentVariables/change-status

    route.delete("/delete/:id", upload.none(), EnvironmentVariablesController.delete); //http://localhost:5000/api/backend/EnvironmentVariables/delete

    route.delete(
        "/delete-image",
        upload.none(),
        EnvironmentVariablesController.deleteSingleImage,
    );

    route.post(
        "/multiple-delete",
        upload.none(),
        EnvironmentVariablesController.multipleDelete,
    );

    app.use("/api/backend/EnvironmentVariables", route);
};
//http://localhost:5000/api/backend/EnvironmentVariables/add
//http://localhost:5000/api/backend/EnvironmentVariables/view
//http://localhost:5000/api/backend/EnvironmentVariables/details/:id
//http://localhost:5000/api/backend/EnvironmentVariables/update/:id
//http://localhost:5000/api/backend/EnvironmentVariables/change-status
//http://localhost:5000/api/backend/EnvironmentVariables/delete/:id
//http://localhost:5000/api/backend/EnvironmentVariables/multiple-delete
