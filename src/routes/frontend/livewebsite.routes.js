const express = require('express');
const route = express.Router();
const livewebsiteController = require('../../controllers/frontend/livewebsite.controller')



module.exports = app => {



    route.post('/view', livewebsiteController.view);  //http://localhost:5000/api/frontend/livewebsite/view


    app.use('/api/frontend/livewebsite', route);

}