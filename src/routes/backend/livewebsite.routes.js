const express = require('express');
const route = express.Router();
const livewebsiteController = require('../../controllers/backend/livewebsite.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), livewebsiteController.create); //http://localhost:5000/api/backend/livewebsite/add

    route.post('/view',upload.none(), livewebsiteController.view);  //http://localhost:5000/api/backend/livewebsite/view

    route.post('/details/:id',upload.none(), livewebsiteController.details) // http://localhost:5000/api/backend/livewebsite/details

    route.put('/update/:id',upload.none(), livewebsiteController.update) // http://localhost:5000/api/backend/livewebsite/update

    route.put('/change-status',upload.none(), livewebsiteController.changeStatus) // http://localhost:5000/api/backend/livewebsite/change-status

    route.delete('/delete/:id',upload.none(), livewebsiteController.delete)  //http://localhost:5000/api/backend/livewebsite/delete


    route.post('/multiple-delete',upload.none(), livewebsiteController.multipleDelete)

    app.use('/api/backend/livewebsite', route);

}