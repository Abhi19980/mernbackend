
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/registration"
,{useUnifiedTopology:true})                 
.then(()=>{console.log(`connection sucessfully established`);
}).catch((err)=>{
    console.log(err);
})