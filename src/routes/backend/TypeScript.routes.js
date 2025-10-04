const express = require('express');
const route = express.Router();
const TypeScriptController = require('../../controllers/backend/TypeScript.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), TypeScriptController.create); //http://localhost:5000/api/backend/TypeScript/add

    route.post('/view',upload.none(), TypeScriptController.view);  //http://localhost:5000/api/backend/TypeScript/view

    route.post('/details/:id',upload.none(), TypeScriptController.details) // http://localhost:5000/api/backend/TypeScript/details

    route.put('/update/:id',upload.none(), TypeScriptController.update) // http://localhost:5000/api/backend/TypeScript/update

    route.put('/change-status',upload.none(), TypeScriptController.changeStatus) // http://localhost:5000/api/backend/TypeScript/change-status

    route.delete('/delete/:id',upload.none(), TypeScriptController.delete)  //http://localhost:5000/api/backend/TypeScript/delete


    route.post('/multiple-delete',upload.none(), TypeScriptController.multipleDelete)

    app.use('/api/backend/TypeScript', route);

}
//http://localhost:5000/api/backend/TypeScript/add
//http://localhost:5000/api/backend/TypeScript/view
//http://localhost:5000/api/backend/TypeScript/details/:id
//http://localhost:5000/api/backend/TypeScript/update/:id
//http://localhost:5000/api/backend/TypeScript/change-status
//http://localhost:5000/api/backend/TypeScript/delete/:id
//http://localhost:5000/api/backend/TypeScript/multiple-delete