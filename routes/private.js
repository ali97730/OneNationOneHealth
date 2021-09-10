const express = require("express");
const router = express.Router();
const { getPrivateRoute ,submitUserDetails, deleteImage} = require("../controllers/private");
const { protect } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");



router.get("/",protect, getPrivateRoute);
//for userdetails
router.post("/details/:user_id",upload.array("image",10),submitUserDetails)

//Pending
// router.delete("/details/:userDetails_id/:cloudinary_id",deleteImage)



module.exports = router;