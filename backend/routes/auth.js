const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Sign UP
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashPassword });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign Up Successful" }));
  } catch (error) {
    //console.log(error);
    /* below we have given status as 200 despite of it being an error is because we dont wanat this error to be displayed in our frontend UI so we treat it as status 200 */
    res.status(200).json({ message: "User Already Exists" });
  }
});

// Sign IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      /* if the user doesn.t exist then also we are going to give status code as 200 instead of 400 despite of it being an error its because we dont want the error to be displayed in our frontend (if you dont get what i am saying so try it out by writing 400 instead of 200 as status code) */
      return res.status(200).json({ message: "Please Sign Up First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Password is Not Correct" });
    }

    /* now if all the above authentication is passed by the user then we will display the data of the user except its password */
    /* here we are not taking password and rest of the stuffs i.e "others" data we are taking from the document of the user which we got */
    const { password, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (error) {
    return res.status(200).json({ message: "Some Error Occured" });
  }
});

module.exports = router;
