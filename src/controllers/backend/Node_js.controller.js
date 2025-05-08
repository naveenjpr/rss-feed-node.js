const courseModel=require('../../models/Node_js.Schema')

exports.create=async(request,response)=>{
data =new courseModel(
    
    {Question:request.body.Question,
    Answers:request.body.Answers,
    status:request.body.status ? request.body.status : true ,
    })


await data.save().then((result)=>{
    var res={
        status:true,
        message:"record create successfully",
        data:result
    }
    response.send(res)
}).catch((error)=>{

    var error_messages = [];

    for (let field in error.errors) {
        // console.log(field);
        error_messages.push(error.errors[field].message);
    }

    var res = {
        status: false,
        message: 'Something went wrong',
        error_messages: error_messages
    }

    response.send(res);

})

}

exports.view=async(request,response)=>{

    await courseModel.find().then((result)=>{
        if (result.length > 0) {
            var res = {
                status: true,
                message: 'Record found successfully !!',
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
    }).catch((error)=>{
        var res = {
            status: false,
            message: 'Something went wrong !!',
        }

        response.send(res);
    })

}
exports.details=async(request,response)=>{
    await courseModel.findById(request.params.id).then((result)=>{
        if (result != '') {
            var res = {
                status: true,
                message: 'Record found successfully !!',
                data: result
            }

            response.send(res);
        } else {
            var res = {
                status: false,
                message: 'No Record found !!',
                data: ''
            }

            response.send(res);
        }

    }).catch((error)=>{
        var res = {
            status: false,
            message: 'Something went wrong !!',
        }

        response.send(res);
    })

}

exports.update = async (request, response) => {
    const data = {
        Question: request.body.Question,
        Answers: request.body.Answers,
        status:request.body.status ?? 1,
    };

    try {
        const result = await courseModel.updateOne(
            { _id: request.params.id },
            { $set: data }
        );

        const res = {
            status: true,
            message: 'Record updated successfully',
            data: result,
        };
        response.send(res);
    } catch (error) {
        let error_messages = [];

        if (error.errors) {
            for (let field in error.errors) {
                error_messages.push(error.errors[field].message);
            }
        } else {
            error_messages.push(error.message);
        }

        const res = {
            status: false,
            message: 'Something went wrong',
            error_messages: error_messages,
        };

        response.status(500).send(res);
    }
};
exports.changeStatus=async(request,response)=>{

    await courseModel.updateOne(
        {
            _id: request.body.id //कौनसा डॉक्यूमेंट ढूंढना है
        },
        {
            $set: {
                status: request.body.status //क्या बदलना है
            }
        }
    )
        .then((result) => {

            var res = {
                status: true,
                message: 'Record update succussfully',
                data: result
            }

            response.send(res);
        }).catch((error) => {

            var res = {
                status: false,
                message: 'Something went wrong',
            }

            response.send(res);
        })

}
exports.delete=async(request,response)=>{
    try {
        const courseId = request.params.id; // Assuming route is like /api/courses/:id
    
        const deletedCourse = await courseModel.findByIdAndDelete(courseId);
    
        if (!deletedCourse) {
          return response.status(404).json({ message: "react notes not found" });
        }
    
        return response.status(200).json({ message: " react  question deleted successfully" });
      } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Server error" });
      }
}
exports.multipleDelete=async(request,response)=>{

}