const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const displayAll = require("./routes/displayAll");
const displayList = require("./routes/displayList");
const list = require("./routes/list");
const cors = require("cors");
const app = express();

/* since we will be getting or transfering data from backend-frontend and these data's will be entirely in json format so we have specified it below*/
app.use(express.json());
app.use(cors());

app.use("/", displayAll);
app.use("/", displayList);
app.use("/", list);
app.use("/api", auth);

/* given below code is used to connect with mongodb atlas and once that connection is successful our backend server will start at port 1000*/
mongoose
  .connect(
    "mongodb+srv://vishal100403:vishal100403@cluster0.ith9xo7.mongodb.net/"
  )
  .then(() => {
    console.log("Connected with mongodb");
    app.listen(1000, (error) => {
      if (error) {
        console.log(error);
      }
      console.log("Running the Server successfuly at", 1000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
