var mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[false,"please provide your Full Name"]
    },
    contactNumber:{
        type:Number,
        required:[false,"please provide Cobtact Number"]
    },
    age:{
        type:Number,
        required:[false,"please provide your age"]
    },
    address:{
        type:String,
    },
    city:{
        type:String,
        required:[false,"please provide City"]
    },
    state:{
        type:String,
        required:[false,"please provide State"]
    },
    pincode:{
        type:Number,
        required:[false,"please provide Pincode"]
    },
    gender:{
        type:String,
        required:[false,"please select Gender"]
    },
    dateOfBirth:{
        type:Date,
        required:[false,"please Enter DateOfBirth"]
    },
    emergencyPhoneNumber:{
        type:Number,
        required:[false,"please provide Emergency Contact Number"]
    },
    bloodGroup:{
        type:String
    },
    familyDoctorNumber:{
        type:Number,
    },
    anyDisability:{
        type:String
    },
    severeDisease:{
        type:String
    },
    donor:{
        type:String
    },

    
    
    images :[{
        cloudinary_id:String,image_url:String
    }],
    user :
        {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    
},{ timestamps: true });

const UserDetails = mongoose.model("UserDetails",userDetailsSchema);

module.exports = UserDetails;