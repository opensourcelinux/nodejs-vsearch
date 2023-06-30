const mongoose =require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    companyname:{
        type:String,
        required:true
    },
     service:{
        type:String,
        required:true
     },
     city:{
        type:String,
        required:true
     },
     price_range:{
        type:Number,
        required:true
     },
     homepage_link:{
        type:String,
        required:true
     },
     image:{
        type:String
     }
})

const Register =new mongoose.model("Data_register",employeeSchema);

module.exports=Register;