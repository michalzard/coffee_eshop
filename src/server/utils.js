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

const mongoose = require("mongoose");

async function checkForSession(sessionId){
  return await mongoose.connection.db.collection("sessions").findOne({_id:sessionId});
}

module.exports = {
  handleValidationErrors,
  checkForSession,
};
