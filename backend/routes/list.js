const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// creating todo
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// updating todo
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list.save().then(() => res.status(200).json({ message: "Task Updated" }));
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// delte task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    /* since what ever todo is present in "list" should also be delted from "user" as well so we are writing $pull: {list: req.params.id}, by doing so we will look for the specific "id" in the list of todos which is present in User */
    const existingUser = await User.findByIdAndUpdate(
      { id },
      { $pull: { list: req.params.id } }
    );

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: "Task Deleted" })
      );
    }
  } catch (error) {
    console.log(error);
    //res.status(400).json({ message: error.message });
  }
});

// get task
router.get("/getTask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length !== 0) {
    return res.status(200).json({ list: list });
  } else {
    return res
      .status(200)
      .json({ message: "No task created by user", list: [] });
  }
});

module.exports = router;
