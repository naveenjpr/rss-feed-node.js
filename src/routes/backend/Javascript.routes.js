const express = require('express');
const route = express.Router();
const JavscriptController = require('../../controllers/backend/Javascript.controller')



module.exports = app => {


    route.post('/add', JavscriptController.create); //http://localhost:5000/api/backend/javascript/add

    route.post('/view', JavscriptController.view);  //http://localhost:5000/api/backend/javascript/view

    route.post('/details/:id', JavscriptController.details) // http://localhost:5000/api/backend/javascript/details

    route.put('/update', JavscriptController.update) // http://localhost:5000/api/backend/javascript/update

    route.put('/change-status', JavscriptController.changeStatus) // http://localhost:5000/api/backend/javascript/change-status

    route.delete('/delete/:id', JavscriptController.delete)  //http://localhost:5000/api/backend/javascript/delete


    route.post('/multiple-delete', JavscriptController.multipleDelete)

    app.use('/api/backend/javascript', route);

}