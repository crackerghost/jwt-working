const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const regSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
   name : {
    type : String,
    required : false,
   } ,
   
   role:{
    type : String,
    required : false
   },

   kyc :{
    type : String,
    required : false

   }

});



const regModel = mongoose.model("Wastewise", regSchema);

module.exports = regModel;
