const userModel = require("../../models/authentication.Schema")
const bcrypt = require("bcrypt") //पासवर्ड को हैश करने के लिए।
var jwt = require("jsonwebtoken") //लॉगिन के बाद यूज़र को ऑथेंटिकेट करने के लिए।
var secretKey = "Gionee123" // JWT को सुरक्षित बनाने के लिए।
const saltRounds = 10;

// note-> thunder client me "form-encode" me code send karne hai kyoi multer ka use nahi liya hai
exports.register = async (request, response) => {
  const existingUser = await userModel.findOne({ email: request.body.email }) //सबसे पहले चेक करता है कि यूज़र पहले से रजिस्टर है या नहीं।

  if (existingUser) {
    return response.status(400).json({
      status: false,
      message: "Email ID already registered!", //अगर ईमेल पहले से मौजूद है, तो "Email ID already registered!" मैसेज भेजता है।
    })
  }

  // नया यूज़र बनाएं
  var data = new userModel({
    name: request.body.name,
    email: request.body.email,
    mobile_number: request.body.mobile_number,
    password: bcrypt.hashSync(request.body.password, saltRounds),
  })
  // यूज़र को डेटाबेस में सेव करें
  console.log("Password received:", request.body.password);

  await data
    .save()
    .then((result) => {
      // JWT टोकन जेनरेट करें

      var token = jwt.sign(
        {
          userData: result,
        },
        secretKey,
        { expiresIn: "1h" }
      )

      response.status(201).json({
        status: true,
        message: "User registered successfully!",
        token: token,
      })
    })
    .catch((error) => {
      response.status(500).json({
        status: false,
        message: "Registration failed!",
        error: error.message,
      })
    })
}

exports.login = async (request, response) => {
  await userModel
    .findOne({ email: request.body.email })

    .then((result) => {
      if (result) {
        var comparePassword = bcrypt.compareSync(
          request.body.password,
          result.password
        )
        if (comparePassword) {
          var token = jwt.sign(
            {
              userData: result,
            },
            secretKey,
            { expiresIn: "1h" }
          )

          var resp = {
            status: true,
            message: "login successfully",
            token: token,
          }
        } else {
          var resp = {
            status: false,
            message: "incorrect password",
          }
        }
      } else {
        var resp = {
          status: false,
          message: "no user found",
          result: result,
        }
      }
      response.send(resp)
    })

    .catch((error) => {
      response.status(500).json({
        status: false,
        message: "Something went wrong!",
        error: error.message,
      })
    })
}