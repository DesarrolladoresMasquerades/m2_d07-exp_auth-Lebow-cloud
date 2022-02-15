const router = require("express").Router();
const checkLogin = require("../../middlewares/auth.middleware")
const fileUploader = require("../../config/cloudinary-config");
const UserModel = require("../../models/User.model");

/* GET home page */
router.get("/", checkLogin, (req, res, next) => {
  res.render("profile");
});

router.routes("/edit")
  .get((req, res, next) => {
    res.render("edit-profile")
  })
  .post((fileUploader.single("imgUrl")),(req, res, next) => {
    const id = req.session.currentUserId 
    const username = req.body.username

    const imgUrl = req.file

    UserModel.findByIdAndUpdate(id, {username, imgUrl}, {new:true})
    .then((user)=> res.render("user-profile", {userInSession : user}))
  })

  

module.exports = router;