const express = require("express");
const route = express.Router();
const GoogleAnalyticsController = require("../../controllers/backend/GoogleAnalytics.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
    route.post(
        "/add",
        upload.array("images", 10),
        GoogleAnalyticsController.create,
    ); //http://localhost:5000/api/backend/GoogleAnalytics/add

    route.post("/view", upload.none(), GoogleAnalyticsController.view); //http://localhost:5000/api/backend/GoogleAnalytics/view

    route.post("/details/:id", upload.none(), GoogleAnalyticsController.details); // http://localhost:5000/api/backend/GoogleAnalytics/details/id

    route.put(
        "/update/:id",
        upload.array("images", 10),
        GoogleAnalyticsController.update,
    ); // http://localhost:5000/api/backend/GoogleAnalytics/update/id

    route.put(
        "/change-status",
        upload.none(),
        GoogleAnalyticsController.changeStatus,
    ); // http://localhost:5000/api/backend/GoogleAnalytics/change-status

    route.delete("/delete/:id", upload.none(), GoogleAnalyticsController.delete); //http://localhost:5000/api/backend/GoogleAnalytics/delete/id
    route.delete(
        "/delete-image",
        upload.none(),
        GoogleAnalyticsController.deleteSingleImage,
    );
    //http://localhost:5000/api/backend/GoogleAnalytics/delete-image
    route.post(
        "/multiple-delete",
        upload.none(),
        GoogleAnalyticsController.multipleDelete,
    );

    app.use("/api/backend/GoogleAnalytics", route);
};
//http://localhost:5000/api/backend/GoogleAnalytics/add
//http://localhost:5000/api/backend/GoogleAnalytics/view
//http://localhost:5000/api/backend/GoogleAnalytics/details/:id
//http://localhost:5000/api/backend/GoogleAnalytics/update/:id
//http://localhost:5000/api/backend/GoogleAnalytics/change-status
//http://localhost:5000/api/backend/GoogleAnalytics/delete/:id
//http://localhost:5000/api/backend/GoogleAnalytics/multiple-delete
