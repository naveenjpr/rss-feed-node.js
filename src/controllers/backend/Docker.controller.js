const DockerModel = require("../../models/Docker.Schema");
const cloudinary = require("../../config/cloudinary.js");

exports.create = (request, response) => {
  console.log(request.body);

  let images = [];

  if (request.files && request.files.length > 0) {
    images = request.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  const data = new DockerModel({
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

    const totalRecords = await DockerModel.countDocuments(condition);
    const result = await DockerModel.find(condition).sort({ _id: -1 });

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

  DockerModel.findById(request.params.id)
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

    // 🔹 Step 1: Find existing record
    const record = await DockerModel.findById(id);

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
    const updated = await DockerModel.findByIdAndUpdate(
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
  await DockerModel.updateOne(
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
    const id = request.params.id;

    // 🔹 Step 1: Check ID
    if (!id) {
      return response.status(400).json({
        status: false,
        message: "ID is required",
      });
    }

    // 🔹 Step 2: Find record
    const record = await DockerModel.findById(id);

    if (!record) {
      return response.status(404).json({
        status: false,
        message: "Docker note not found",
      });
    }

    // 🔹 Step 3: Delete images from Cloudinary
    if (record.images && record.images.length > 0) {
      for (let img of record.images) {
        if (img.public_id) {
          try {
            await cloudinary.uploader.destroy(img.public_id);
          } catch (err) {
            console.log("Cloudinary delete error:", err.message);
          }
        }
      }
    }

    // 🔹 Step 4: Delete DB record
    await DockerModel.findByIdAndDelete(id);

    return response.status(200).json({
      status: true,
      message: "Record & images deleted permanently",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
