const QuizAppModel = require('../../models/QuizApp');
exports.create = async (request, response) => {
    try {
  
      const data = new QuizAppModel({
        question: request.body.question,
        options: request.body.options,
        correctAnswer: request.body.correctAnswer,
        status: request.body.status ?? true, // default true if not sent
      });
  
      const result = await data.save();
  
      response.send({
        status: true,
        message: 'Record created successfully',
        data: result
      });
  
    } catch (error) {
      const error_messages = [];
  
      if (error.errors) {
        for (let field in error.errors) {
          error_messages.push(error.errors[field].message);
        }
      } else {
        error_messages.push(error.message);
      }
  
      response.status(400).send({
        status: false,
        message: 'Something went wrong',
        error_messages
      });
    }
  };

  exports.view = async (request, response) => {
    console.log("Fetching quiz questions...");
  
    try {
      const result = await QuizAppModel.find();
  
      if (result.length > 0) {
        return response.status(200).json({
          status: true,
          message: 'Record found successfully !!',
          data: result
        });
      } else {
        return response.status(404).json({
          status: false,
          message: 'No Record found !!',
          data: []
        });
      }
  
    } catch (error) {
      console.error("Error fetching quiz questions:", error.message);
      return response.status(500).json({
        status: false,
        message: 'Something went wrong !!',
        error: error.message
      });
    }
  };
  

// exports.details = async(request,response) => {
    
//     var condition = {
//         deleted_at : null
//     }

//     await QuizAppModel.findById(request.params.id).then((result) => {
//         if(result != ''){
//             var res = {
//                 status : true,
//                 message : 'Record found successfully !!',
//                 data : result
//             }
        
//             response.send(res);
//         } else {
//             var res = {
//                 status : false,
//                 message : 'No Record found !!',
//                 data : ''
//             }
        
//             response.send(res);
//         }
//     }).catch((error) => {
//         var res = {
//             status : false,
//             message : 'Something went wrong !!',
//         }
    
//         response.send(res);
//     });
// }

// exports.update = async(request,response) => {

//     console.log(request.file);
//     data = {
//         name : request.body.name,
//         price : request.body.price,
//         duration : request.body.duration,
//         description : request.body.description,
//         status : request.body.status ?? 1,
//         order : request.body.order ?? 1,
//     };

//     if(request.file != undefined){
//         if(request.file.filename != ''){
//             data.image = request.file.filename;
//         }
//     }

//     await QuizAppModel.updateOne(
//         {
//             _id : request.body.id
//         }, 
//         {
//             $set : data
//         }
        
//     )
//     .then((result) => {

//         var res = {
//             status : true,
//             message : 'Record update succussfully',
//             data : result
//         }
    
//         response.send(res);
//     }).catch((error) => {
//         var error_messages = [];

//         for(let field in error.errors){
//             // console.log(field);
//             error_messages.push(error.errors[field].message);
//         }

//         var res = {
//             status : false,
//             message : 'Something went wrong',
//             error_messages : error_messages
//         }
    
//         response.send(res);
//     })
// }

// exports.changeStatus = async(request,response) => {

//     const courseData = await QuizAppModel.findOne({
//         _id : request.body.id
//     });

//     // console.log(courseData.length);

//     if(courseData == null){
//         var res = {
//             status : false,
//             message : 'Id not match in the database',
//         }
    
//         response.send(res);
//     }

//     await QuizAppModel.updateOne(
//         {
//             _id : request.body.id
//         }, 
//         {
//             $set : {
//                 status : request.body.status
//             }
//         } 
//     )
//     .then((result) => {

//         var res = {
//             status : true,
//             message : 'Record update succussfully',
//             data : result
//         }
    
//         response.send(res);
//     }).catch((error) => {

//         var res = {
//             status : false,
//             message : 'Something went wrong',
//         }
    
//         response.send(res);
//     })
// }

// exports.delete = async(request,response) => {

//     console.log(request.body.id);
//     const courseData = await QuizAppModel.findOne({
//         _id : request.body.id,
//         deleted_at : null
//     });

//     if(courseData == null){
//         var res = {
//             status : false,
//             message : 'Id not match in the database',
//         }
    
//         response.send(res);
//     }

//     await QuizAppModel.updateOne(
//         {
//             _id : request.body.id
//         }, 
//         {
//             $set : {
//                 deleted_at : Date.now()
//             }
//         } 
//     )
//     .then((result) => {

//         var res = {
//             status : true,
//             message : 'Record delete succussfully',
//         }
    
//         response.send(res);
//     }).catch((error) => {

//         var res = {
//             status : false,
//             message : 'Something went wrong',
//         }
    
//         response.send(res);
//     })

// }

// exports.multipleDelete = async(request,response) => {

//     await QuizAppModel.updateMany(
//         {
//             _id : { $in : request.body.ids }
//         }, 
//         {
//             $set : {
//                 deleted_at : Date.now()
//             }
//         } 
//     )
//     .then((result) => {

//         var res = {
//             status : true,
//             message : 'Record delete succussfully',
//         }
    
//         response.send(res);
//     }).catch((error) => {

//         var res = {
//             status : false,
//             message : 'Something went wrong',
//         }
    
//         response.send(res);
//     })

// }
