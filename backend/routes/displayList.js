const router = require("express").Router();
const List = require("../models/list");

router.get("/list", async (req, res) => {
  try {
    const showAll = await List.find();
    res.status(200).json(showAll);
  } catch (error) {
    //console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
