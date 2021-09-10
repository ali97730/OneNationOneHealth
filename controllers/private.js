const User = require("../models/User");
const UserDetails = require("../models/UserDetails")
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

exports.getPrivateRoute = (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        data: "You got access to the private data in this route",
      });
  };

exports.submitUserDetails = async (req,res) => {

  
  console.log(req.files)
  const { fullname,age} = req.body;
   const id = req.params.user_id;
    try {

      var imageUrlList = [];
  
        for (var i = 0; i < req.files.length; i++) {
            var locaFilePath = req.files[i].path;
  
            // Upload the local image to Cloudinary
            // and get image url as response
            var result = await cloudinary.uploader.upload(locaFilePath);
            imageUrlList.push({cloudinary_id:result.public_id,image_url:result.secure_url});
        }
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);
  
      
      // Create new user
      let userDetails = await new UserDetails({
        fullname,
        age,
        images:imageUrlList,
        id
      });
      // Save user
       await userDetails.save();
      res.json(userDetails);//we are sending to front end
    } catch (err) {
      console.log(err);
    }
    

}

//Pending
// exports.deleteImage = async (req,res) => {
//   const image_id = req.params.cloudinary_id;
//   const userDetails_id = req.params.userDetails_id;
  
   

   
//  }

