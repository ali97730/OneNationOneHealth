var mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    fullname:{
        type:String,
      
    },
    contactNumber:{
        type:Number,
       
    },
    age:{
        type:Number,
       
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
        
    },
    pincode:{
        type:Number,
        
    },
    gender:{
        type:String,
       
    },
    dateOfBirth:{
        type:Date,
       
    },
    emergencyPhoneNumber:{
        type:Number,
       
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
    items :[{
        dateofDiagnosed:String,
        hospitalname:String,
        purpose:String
      }]
    ,
    user :
        {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    
},{ timestamps: true });

const UserDetails = mongoose.model("UserDetails",userDetailsSchema);

module.exports = UserDetails;