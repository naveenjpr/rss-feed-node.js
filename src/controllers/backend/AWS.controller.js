const courseModel = require("../../models/AWS.schema");
const cloudinary = require("../../config/cloudinary.js");

exports.create = async (request, response) => {
  let images = [];

  if (request.files && request.files.length > 0) {
    images = request.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  const data = new courseModel({
    Question: request.body.Question,
    Answers: request.body.Answers,
    images: images,
    status: request.body.status ? request.body.status : true,
  });

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
    const id = request.params.id;

    // 🔹 Step 1: Find existing record
    const record = await courseModel.findById(id);

    if (!record) {
      return response.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 🔹 Step 2: Prepare update data
    const updateData = {
      Question: request.body.Question,
      Answers: request.body.Answers,
      status: request.body.status ?? true,
    };

    // 🔹 Step 3: If new images आए हैं
    if (request.files && request.files.length > 0) {
      // ❌ Step 3.1: Delete old images from Cloudinary
      if (record.images && record.images.length > 0) {
        for (let img of record.images) {
          if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }
      }

      // ✅ Step 3.2: Add new images
      const newImages = request.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      updateData.images = newImages;
    }

    // 🔹 Step 4: Update DB
    const updated = await courseModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    return response.status(200).json({
      status: true,
      message: "Record updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
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

    // 🔹 Step 1: Find record first
    const record = await courseModel.findById(courseId);

    if (!record) {
      return response.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 🔹 Step 2: Delete images from Cloudinary
    if (record.images && record.images.length > 0) {
      for (let img of record.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // 🔹 Step 3: Delete record from DB
    await courseModel.findByIdAndDelete(courseId);

    return response.status(200).json({
      status: true,
      message: "Record + Images deleted permanently",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteSingleImage = async (request, response) => {
  try {
    const { id, public_id } = request.body; // record id and image public_id

    const record = await courseModel.findById(id);

    if (!record) {
      return response.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // Find image in array
    const imageIndex = record.images.findIndex(
      (img) => img.public_id === public_id,
    );

    if (imageIndex === -1) {
      return response.status(404).json({
        status: false,
        message: "Image not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Remove image from array
    record.images.splice(imageIndex, 1);
    await record.save();

    response.json({
      status: true,
      message: "Image deleted successfully",
      data: record.images,
    });
  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
