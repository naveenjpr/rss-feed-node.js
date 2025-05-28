const express = require('express');
const route = express.Router();
const HTML_CSSController = require('../../controllers/frontend/HTML_CSS.controller')



module.exports = app => {



    route.post('/view', HTML_CSSController.view);  //http://localhost:5000/api/frontend/HTML_CSS/view


    app.use('/api/frontend/HTML_CSS', route);

}