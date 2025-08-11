const express = require('express');
const route = express.Router();
const NextjsController = require('../../controllers/backend/Nextjs.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), NextjsController.create); //http://localhost:5000/api/backend/Nextjs/add

    route.post('/view',upload.none(), NextjsController.view);  //http://localhost:5000/api/backend/Nextjs/view

    route.post('/details/:id',upload.none(), NextjsController.details) // http://localhost:5000/api/backend/Nextjs/details

    route.put('/update/:id',upload.none(), NextjsController.update) // http://localhost:5000/api/backend/Nextjs/update

    route.put('/change-status',upload.none(), NextjsController.changeStatus) // http://localhost:5000/api/backend/Nextjs/change-status

    route.delete('/delete/:id',upload.none(), NextjsController.delete)  //http://localhost:5000/api/backend/Nextjs/delete


    route.post('/multiple-delete',upload.none(), NextjsController.multipleDelete)

    app.use('/api/backend/Nextjs', route);

}