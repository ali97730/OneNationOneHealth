var mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"please provide your Full Name"]
    },
    age:{
        type:Number,
        required:[true,"please provide your age"]
    },
    user :
        {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    
},{ timestamps: true });

const UserDetails = mongoose.model("UserDetails",userDetailsSchema);

module.exports = UserDetails;