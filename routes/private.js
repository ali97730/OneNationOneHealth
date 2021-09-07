const express = require("express");
const router = express.Router();
const { getPrivateRoute ,submitUserDetails} = require("../controllers/private");
const { protect } = require("../middleware/auth");


router.get("/",protect, getPrivateRoute);
//for userdetails
router.post("/details/:user_id",submitUserDetails)

module.exports = router;