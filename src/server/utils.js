function handleValidationErrors(response, errorObject) {
  console.log(errorObject);
  if (errorObject.name === "ValidationError") {
    let errors = {};
    Object.keys(errorObject.errors).forEach((key) => {
      errors[key] = errorObject.errors[key].message;
    });
    response.status(400).send(errors);
  } else response.status(400).send({ message: errorObject.response });
}

async function checkForSession(sessionId){
  const mongoose = require("mongoose");
  return await mongoose.connection.db.collection("sessions").findOne({_id:sessionId});
}

function getSessionCookie(cookie){
  return cookie.split("session_id=")[1];
}

module.exports = {
  handleValidationErrors,
  checkForSession,
  getSessionCookie
};
