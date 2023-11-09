const router = require("express").Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    //console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
