const PostgreSQLModel = require("../../models/PostgreSQL.Schema");

exports.create = (request, response) => {
  console.log(request.body);
  const data = new PostgreSQLModel({
    Question: request.body.Question,
    Answers: request.body.Answers,
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

    const totalRecords = await PostgreSQLModel.countDocuments(condition);
    const result = await PostgreSQLModel.find(condition).sort({ _id: -1 });

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

  PostgreSQLModel.findById(request.params.id)
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
exports.update = (request, response) => {
  const updateData = {
    Question: request.body.Question,
    Answers: request.body.Answers,
    status: request.body.status ?? 1,
  };

  PostgreSQLModel.updateOne(
    { _id: request.params.id, deleted_at: null },
    { $set: updateData },
  )
    .then((result) => {
      response.send({
        status: true,
        message: "Record updated successfully",
        data: result,
      });
    })
    .catch((error) => {
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
    });
};

exports.changeStatus = async (request, response) => {
  await PostgreSQLModel.updateOne(
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
    const courseId = request.params.id; // Assuming route is like /api/courses/:id

    const deletedCourse = await PostgreSQLModel.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return response
        .status(404)
        .json({ message: "PostgreSQL notes not found" });
    }

    return response
      .status(200)
      .json({ message: " PostgreSQL question deleted successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Server error" });
  }
};
