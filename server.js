const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require('mongodb');

const index = require("./routes/index");
const user = require("./routes/user");
const skill = require("./routes/skill");
const seeder = require("./routes/seeder");

app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);
app.use("/user", user);
app.use("/skill", skill);
app.use("/seeder", seeder);


app.listen(3000, () => {
  console.log(`Server has been started!`);
})
