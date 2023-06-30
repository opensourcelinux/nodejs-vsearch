
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/data_registration").then(()=>{
    console.log(`connection succesfull`);
}).catch((e)=>{
    console.log(`no conncetion `+ e );
})