const express = require('express');
const route = express.Router();
const Node_jsController = require('../../controllers/backend/Node_js.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), Node_jsController.create); //http://localhost:5000/api/backend/node-js-Notes/add

    route.post('/view',upload.none(), Node_jsController.view);  //http://localhost:5000/api/backend/node-js-Notes/view

    route.post('/details/:id',upload.none(), Node_jsController.details) // http://localhost:5000/api/backend/node-js-Notes/details

    route.put('/update/:id',upload.none(), Node_jsController.update) // http://localhost:5000/api/backend/node-js-Notes/update

    route.put('/change-status',upload.none(), Node_jsController.changeStatus) // http://localhost:5000/api/backend/node-js-Notes/change-status

    route.delete('/delete/:id',upload.none(), Node_jsController.delete)  //http://localhost:5000/api/backend/node-js-Notes/delete

    route.post('/multiple-delete',upload.none(), Node_jsController.multipleDelete)

    app.use('/api/backend/node-js-Notes', route);

}