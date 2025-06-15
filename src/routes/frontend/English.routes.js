const express = require('express');
const route = express.Router();
const EnglishController = require('../../controllers/frontend/English.controller')



module.exports = app => {



    route.post('/view', EnglishController.view);  //http://localhost:5000/api/frontend/English/view


    app.use('/api/frontend/English', route);

}