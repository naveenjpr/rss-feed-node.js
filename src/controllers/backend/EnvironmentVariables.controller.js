const courseModel = require("../../models/EnvironmentVariables.js");
const cloudinary = require("../../config/cloudinary");



exports.create = async (request, response) => {


    data = new courseModel({
        Question: request.body.Question,
        Answers: request.body.Answers,
        status: request.body.status ? request.body.status : true,
        image: request.file?.path,           // direct use
        image_public_id: request.file?.filename,
    });
    console.log("dtat", data);

    await data
        .save()
        .then((result) => {
            var res = {
                status: true,
                message: "record create successfully",
                data: result,
            };
            response.send(res);
        })
        .catch((error) => {
            var error_messages = [];

            for (let field in error.errors) {
                // console.log(field);
                error_messages.push(error.errors[field].message);
            }

            var res = {
                status: false,
                message: "Something went wrong",
                error_messages: error_messages,
            };

            response.send(res);
        });
};

exports.view = async (request, response) => {
    const totalRecords = await courseModel.countDocuments();

    await courseModel
        .find()
        .sort({ _id: -1 })
        .then((result) => {
            if (result.length > 0) {
                var res = {
                    status: true,
                    message: "Record found successfully !!",
                    totalRecords: totalRecords,
                    data: result,
                };

                response.send(res);
            } else {
                //गर कोई रिकॉर्ड नहीं मिला (result.length === 0)
                var res = {
                    status: false,
                    message: "No Record found !!",
                    data: "",
                };

                response.send(res);
            }
        })
        .catch((error) => {
            var res = {
                status: false,
                message: "Something went wrong !!",
                error: error.message,
            };

            response.send(res);
        });
};
exports.details = async (request, response) => {
    await courseModel
        .findById(request.params.id)
        .then((result) => {
            if (result != "") {
                var res = {
                    status: true,
                    message: "Record found successfully !!",
                    data: result,
                };

                response.send(res);
            } else {
                var res = {
                    status: false,
                    message: "No Record found !!",
                    data: "",
                };

                response.send(res);
            }
        })
        .catch((error) => {
            var res = {
                status: false,
                message: "Something went wrong !!",
            };

            response.send(res);
        });
};

exports.update = async (request, response) => {
    try {
        const data = {
            Question: request.body.Question,
            Answers: request.body.Answers,
            status: request.body.status ?? true,
        };

        // 🔥 Agar new image aayi hai
        if (request.file) {
            // 🔹 old data fetch karo
            const oldData = await courseModel.findById(request.params.id);

            // 🔥 old image delete
            if (oldData?.image_public_id) {
                await cloudinary.uploader.destroy(oldData.image_public_id);
            }

            // 🔥 new image set
            data.image = request.file.path;
            data.image_public_id = request.file.filename;
        }

        const result = await courseModel.updateOne(
            { _id: request.params.id },
            { $set: data }
        );

        response.send({
            status: true,
            message: "Record updated successfully",
            data: result,
        });

    } catch (error) {
        let error_messages = [];

        if (error.errors) {
            for (let field in error.errors) {
                error_messages.push(error.errors[field].message);
            }
        } else {
            error_messages.push(error.message);
        }

        response.status(500).send({
            status: false,
            message: "Something went wrong",
            error_messages,
        });
    }
};

exports.changeStatus = async (request, response) => {
    await courseModel
        .updateOne(
            {
                _id: request.body.id, //कौनसा डॉक्यूमेंट ढूंढना है
            },
            {
                $set: {
                    status: request.body.status, //क्या बदलना है
                },
            },
        )
        .then((result) => {
            var res = {
                status: true,
                message: "Record update succussfully",
                data: result,
            };

            response.send(res);
        })
        .catch((error) => {
            var res = {
                status: false,
                message: "Something went wrong",
            };

            response.send(res);
        });
};
exports.delete = async (request, response) => {
    try {
        const courseId = request.params.id;

        // 🔹 Pehle data find karo
        const data = await courseModel.findById(courseId);

        if (!data) {
            return response.status(404).json({
                status: false,
                message: "EnvironmentVariables notes not found",
            });
        }

        // 🔥 Cloudinary image delete
        if (data.image_public_id) {
            await cloudinary.uploader.destroy(data.image_public_id);
        }

        // 🔥 DB se delete
        await courseModel.findByIdAndDelete(courseId);

        return response.status(200).json({
            status: true,
            message: "EnvironmentVariables notes deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};
exports.multipleDelete = async (request, response) => { };
