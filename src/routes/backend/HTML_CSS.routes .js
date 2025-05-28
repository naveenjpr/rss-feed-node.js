const express = require('express');
const route = express.Router();
const HTML_CSSController = require('../../controllers/backend/HTML_CSS.controller')
const multer  = require('multer')
const upload = multer()


module.exports = app => {


    route.post('/add',upload.none(), HTML_CSSController.create); //http://localhost:5000/api/backend/HTML_CSS/add

    route.post('/view',upload.none(), HTML_CSSController.view);  //http://localhost:5000/api/backend/HTML_CSS/view

    route.post('/details/:id',upload.none(), HTML_CSSController.details) // http://localhost:5000/api/backend/HTML_CSS/details

    route.put('/update/:id',upload.none(), HTML_CSSController.update) // http://localhost:5000/api/backend/HTML_CSS/update

    route.put('/change-status',upload.none(), HTML_CSSController.changeStatus) // http://localhost:5000/api/backend/HTML_CSS/change-status

    route.delete('/delete/:id',upload.none(), HTML_CSSController.delete)  //http://localhost:5000/api/backend/HTML_CSS/delete



    app.use('/api/backend/HTML_CSS', route);

}