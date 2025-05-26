const courseModel=require('../../models/Node_js.Schema')



exports.view=async(request,response)=>{
    var condition = {
        status : 1
    }


    await courseModel.find(condition).sort({ _id: -1 }).then((result)=>{
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
            error:error.message

        }

        response.send(res);
    })

}
