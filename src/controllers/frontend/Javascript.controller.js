const courseModel = require('../../models/Javascript.Schema')
var jwt = require("jsonwebtoken") //लॉगिन के बाद यूज़र को ऑथेंटिकेट करने के लिए।
var secretKey = "Gionee123" // JWT को सुरक्षित बनाने के लिए।


// exports.view = async (request, response) => {
//     console.log(request.body);

//     const authHeader = request.headers.authorization;
//     if (!authHeader) {
//         return response.status(401).json({
//             status: false,
//             token_error: true,
//             message: 'Token required'
//         });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return response.status(401).json({
//             status: false,
//             token_error: true,
//             message: 'Invalid token format'
//         });
//     }

//     jwt.verify(token, secretKey, function (error, result) {

//         if (error) {
//             return response.status(401).json({ 
//                 status: false,
//                 message: 'Invalid token'
//             });
//         }
//         else {
//             var userDetails = result;
//             console.log(userDetails)
//         }
//     })

//     var condition = {
//         status: 1
//     }

//     await courseModel.find(condition).sort({ _id: -1 }).then((result,userDetails) => {
//         if (result.length > 0) {
//             var res = {
//                 status: true,
//                 message: 'Record found successfully !!',
//                 userDetails:userDetails,
//                 data: result
//             }

//             response.send(res);
//         } else {
//             //गर कोई रिकॉर्ड नहीं मिला (result.length === 0)
//             var res = {
//                 status: false,
//                 message: 'No Record found !!',

//                 data: []
//             }

//             response.send(res);
//         }
//     }).catch((error) => {
//         var res = {
//             status: false,
//             message: 'Something went wrong !!',
//             error:error.message
//         }

//         response.send(res);
//     })

// }


exports.view = (request, response) => {
    console.log("Fetching quiz questions...");
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

    // Step 1: Verify token
    new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                reject(new Error('Invalid or expired token'));
            } else {
                resolve(decoded);
            }
        });
    })

    // Step 2: Fetch quiz data
    .then(userDetails => {
        const condition = { status: 1 };

        return courseModel.find(condition).sort({ _id: -1 }).then(result => {
            if (result.length > 0) {
                return response.json({
                    status: true,
                    message: 'Record found successfully !!',
                    userDetails: userDetails,
                    data: result
                });
            } else {
                return response.json({
                    status: false,
                    message: 'No Record found !!',
                    data: []
                });
            }
        });
    })

    // Step 3: Catch all errors
    .catch(error => {
        return response.status(401).json({
            status: false,
            message: error.message || 'Something went wrong !!'
        });
    });
};
