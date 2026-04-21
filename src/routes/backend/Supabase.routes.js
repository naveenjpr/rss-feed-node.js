const express = require("express");
const route = express.Router();
const SupabaseController = require("../../controllers/backend/Supabase.controller");
const multer = require("multer");
const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.array("images", 10), SupabaseController.create); //http://localhost:5000/api/backend/Supabase/add

  route.post("/view", upload.none(), SupabaseController.view); //http://localhost:5000/api/backend/Supabase/view

  route.post("/details/:id", upload.none(), SupabaseController.details); // http://localhost:5000/api/backend/Supabase/details

  route.put(
    "/update/:id",
    upload.array("images", 10),
    SupabaseController.update,
  ); // http://localhost:5000/api/backend/Supabase/update

  route.put("/change-status", upload.none(), SupabaseController.changeStatus); // http://localhost:5000/api/backend/Supabase/change-status

  route.delete("/delete/:id", upload.none(), SupabaseController.delete); //http://localhost:5000/api/backend/Supabase/delete
  route.delete(
    "/delete-image",
    upload.none(),
    SupabaseController.deleteSingleImage,
  );
  //http://localhost:5000/api/backend/Supabase/delete-image
  app.use("/api/backend/Supabase", route);
};
