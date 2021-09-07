const UserDetails = require("../models/UserDetails")

exports.getPrivateRoute = (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        data: "You got access to the private data in this route",
      });
  };

exports.submitUserDetails = async (req,res,next) => {
  const { fullname,age} = req.body;
  const id = req.params.user_id

  try {
      const user = await UserDetails.create({
          fullname,
          age,
          user:id
      });

      // res.status(201).json({
      //     success: true,
      //     user:user
      // })
      // res.status(200).json({ sucess: true,data:"userdetails filled",user});
      
       res.status(200).json({ sucess: true,data:"user details filled",user});

     
      
  } catch (error) {
     next(error)
  }

}

