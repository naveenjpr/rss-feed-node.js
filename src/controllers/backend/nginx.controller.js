const courseModel = require("../../models/nginx.Schema");
const cloudinary = require("../../config/cloudinary.js");

// ================= CREATE =================
exports.create = async (request, response) => {
  try {
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
      status: request.body.status ?? true,
      images: images,
    });

    const result = await data.save();

    response.send({
      status: true,
      message: "Record created successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ================= VIEW =================
exports.view = async (request, response) => {
  try {
    const totalRecords = await courseModel.countDocuments();

    const result = await courseModel.find().sort({ _id: -1 });

    if (result.length > 0) {
      response.send({
        status: true,
        message: "Record found successfully !!",
        totalRecords,
        data: result,
      });
    } else {
      response.send({
        status: false,
        message: "No Record found !!",
        data: [],
      });
    }
  } catch (error) {
    response.send({
      status: false,
      message: "Something went wrong !!",
      error: error.message,
    });
  }
};

// ================= DETAILS =================
exports.details = async (request, response) => {
  try {
    const result = await courseModel.findById(request.params.id);

    if (result) {
      response.send({
        status: true,
        message: "Record found successfully !!",
        data: result,
      });
    } else {
      response.send({
        status: false,
        message: "No Record found !!",
        data: null,
      });
    }
  } catch (error) {
    response.send({
      status: false,
      message: "Something went wrong !!",
      error: error.message,
    });
  }
};

// ================= UPDATE =================
exports.update = async (request, response) => {
  try {
    const oldData = await courseModel.findById(request.params.id);

    if (!oldData) {
      return response.status(404).send({
        status: false,
        message: "Record not found",
      });
    }

    let images = oldData.images || [];

    // 🔥 Agar new images aaye
    if (request.files && request.files.length > 0) {
      // 🔹 old images delete
      for (let img of oldData.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }

      // 🔹 new images set
      images = request.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const result = await courseModel.updateOne(
      { _id: request.params.id },
      {
        $set: {
          Question: request.body.Question,
          Answers: request.body.Answers,
          status: request.body.status ?? true,
          images: images,
        },
      },
    );

    response.send({
      status: true,
      message: "Record updated successfully",
      data: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ================= CHANGE STATUS =================
exports.changeStatus = async (request, response) => {
  try {
    const result = await courseModel.updateOne(
      { _id: request.body.id },
      {
        $set: {
          status: request.body.status,
        },
      },
    );

    response.send({
      status: true,
      message: "Status updated successfully",
      data: result,
    });
  } catch (error) {
    response.send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ================= DELETE =================
exports.delete = async (request, response) => {
  try {
    const data = await courseModel.findById(request.params.id);

    if (!data) {
      return response.status(404).json({
        status: false,
        message: "nginx notes not found",
      });
    }

    // 🔥 Delete all images from Cloudinary
    if (data.images && data.images.length > 0) {
      for (let img of data.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    await courseModel.findByIdAndDelete(request.params.id);

    return response.status(200).json({
      status: true,
      message: "nginx notes deleted successfully",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "Server error",
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
        message: "Record not found"
      });
    }

    // Find image in array
    const imageIndex = record.images.findIndex(img => img.public_id === public_id);

    if (imageIndex === -1) {
      return response.status(404).json({
        status: false,
        message: "Image not found"
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
      data: record.images
    });

  } catch (error) {
    response.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};

// // ================= MULTIPLE DELETE =================
// exports.multipleDelete = async (request, response) => {
//   try {
//     const ids = request.body.ids; // array of ids

//     const records = await courseModel.find({ _id: { $in: ids } });

//     // 🔥 delete images
//     for (let record of records) {
//       if (record.images && record.images.length > 0) {
//         for (let img of record.images) {
//           if (img.public_id) {
//             await cloudinary.uploader.destroy(img.public_id);
//           }
//         }
//       }
//     }

//     await courseModel.deleteMany({ _id: { $in: ids } });

//     response.send({
//       status: true,
//       message: "Multiple records deleted successfully",
//     });
//   } catch (error) {
//     response.send({
//       status: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };
