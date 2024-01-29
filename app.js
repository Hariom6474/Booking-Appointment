const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const UserRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", UserRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
