var mongoose = require("mongoose");
// Setup schema
var contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: String,
  phone: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});
// Export Contact model
var Contact = (module.exports = mongoose.model("contact", contactSchema));
module.exports.get = function(callback, limit) {
  // find when passed a callback will give this callback an err and the list of all docs as parameters
  Contact.find(callback).limit(limit);
};
