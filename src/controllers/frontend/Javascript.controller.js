const courseModel = require('../../models/Javascript.Schema')
var jwt = require("jsonwebtoken") //लॉगिन के बाद यूज़र को ऑथेंटिकेट करने के लिए।
var secretKey = "Gionee123" // JWT को सुरक्षित बनाने के लिए।


exports.view = async (request, response) => {
    console.log(request.body);

    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            status: false,
            token_error: true,
            message: 'Token required'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return response.status(401).json({
            status: false,
            token_error: true,
            message: 'Invalid token format'
        });
    }

    jwt.verify(token, secretKey, function (error, result) {

        if (error) {
            var res = {
                status: false,
                message: 'Incorrect or expired token'
            }
            response.send(res)
        }
        else {
            var userDetails = result;
            console.log(userDetails)
        }
    })

    var condition = {
        status: 1
    }

    await courseModel.find(condition).sort({ _id: -1 }).then((result,userDetails) => {
        if (result.length > 0) {
            var res = {
                status: true,
                message: 'Record found successfully !!',
                userDetails:userDetails,
                data: result
            }

            response.send(res);
        } else {
            //गर कोई रिकॉर्ड नहीं मिला (result.length === 0)
            var res = {
                status: false,
                message: 'No Record found !!',

                data: ''
            }

            response.send(res);
        }
    }).catch((error) => {
        var res = {
            status: false,
            message: 'Something went wrong !!',
            error:error.message
        }

        response.send(res);
    })

}
