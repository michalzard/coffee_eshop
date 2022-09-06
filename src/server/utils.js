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
async function deleteSession(sessionId){
  return await mongoose.connection.db.collection("sessions").findOneAndDelete({_id:sessionId});
}
const parseCookie = str => str.split(';').map(v => v.split('=')).reduce((acc, v) => { acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim()); return acc;}, {});
function getSessionCookie(cookie){
  if(typeof cookie === "string"){
  const parsedCookie = parseCookie(cookie);
  if(parsedCookie.session_id) return parsedCookie.session_id;
  }else return null;
}

module.exports = {
  handleValidationErrors,
  checkForSession,
  deleteSession,
  getSessionCookie
};
