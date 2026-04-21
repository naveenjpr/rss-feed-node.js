const SupabaseModel = require("../../models/Supabase.Schema");
const cloudinary = require("../../config/cloudinary.js");

exports.create = (request, response) => {
  let images = [];

  if (request.files && request.files.length > 0) {
    images = request.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }
  const data = new SupabaseModel({
    Question: request.body.Question,
    Answers: request.body.Answers,
    images: images,

    status: request.body.status ? request.body.status : true,
  });
  data
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
  try {
    let condition = { deleted_at: null };

    const totalRecords = await SupabaseModel.countDocuments(condition);
    const result = await SupabaseModel.find(condition).sort({ _id: -1 });

    if (result.length > 0) {
      response.send({
        status: true,
        message: "Record found successfully",
        totalRecords: totalRecords,
        data: result,
      });
    } else {
      response.send({
        status: false,
        message: "No record found",
        totalRecords: 0,
        data: [],
      });
    }
  } catch (error) {
    response.send({
      status: false,
      message: error.message,
    });
  }
};

exports.details = (request, response) => {
  let condition = {
    deleted_at: null,
  };

  SupabaseModel.findById(request.params.id)
    .then((result) => {
      if (result != "") {
        var res = {
          status: true,
          message: "Record found successfully",
          data: result,
        };
        response.send(res);
      } else {
        var res = {
          status: false,
          message: "no record found",
          data: "",
        };
        response.send(res);
      }
    })
    .catch((error) => {
      var res = {
        status: false,
        message: error,
      };
    });
};
exports.update = async (request, response) => {
  try {
    const id = request.params.id;

    const record = await SupabaseModel.findById(id);

    if (!record) {
      return response.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    const updateData = {
      Question: request.body.Question,
      Answers: request.body.Answers,
      status: request.body.status ?? true,
    };

    if (request.files && request.files.length > 0) {
      const newImages = request.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      updateData.images = [...record.images, ...newImages];
    } else {
      updateData.images = record.images;
    }

    const updated = await SupabaseModel.findByIdAndUpdate(
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
  await SupabaseModel.updateOne(
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

exports.deleteSingleImage = async (request, response) => {
  try {
    const { id, public_id } = request.body; // record id and image public_id

    const record = await SupabaseModel.findById(id);

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

exports.delete = async (request, response) => {
  try {
    const data = await SupabaseModel.findById(request.params.id);

    if (!data) {
      return response.status(404).json({
        status: false,
        message: "node.js notes not found",
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

    await SupabaseModel.findByIdAndDelete(request.params.id);

    return response.status(200).json({
      status: true,
      message: "node js notes deleted successfully",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
