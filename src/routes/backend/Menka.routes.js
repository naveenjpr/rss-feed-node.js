const express = require('express');
const route = express.Router();
const MenkaController = require('../../controllers/backend/Menka.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), MenkaController.create); //http://localhost:5000/api/backend/Menka/add

    route.post('/view',upload.none(), MenkaController.view);  //http://localhost:5000/api/backend/Menka/view

    route.post('/details/:id',upload.none(), MenkaController.details) // http://localhost:5000/api/backend/Menka/details

    route.put('/update/:id',upload.none(), MenkaController.update) // http://localhost:5000/api/backend/Menka/update

    route.put('/change-status',upload.none(), MenkaController.changeStatus) // http://localhost:5000/api/backend/Menka/change-status

    route.delete('/delete/:id',upload.none(), MenkaController.delete)  //http://localhost:5000/api/backend/Menka/delete


    route.post('/multiple-delete',upload.none(), MenkaController.multipleDelete)

    app.use('/api/backend/Menka', route);

}