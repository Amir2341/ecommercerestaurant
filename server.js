const express = require("express");
const mongoose = require("mongoose");
const Menu = require("./model/menu");
require("dotenv/config");

const app = express();
app.use(express.json());

const menuRoutes = require("./routes/menu");

app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  console.log("we are on home");
});

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}

connect();

app.listen(8000, () => {
  console.log("app listening on port 8000");
});
