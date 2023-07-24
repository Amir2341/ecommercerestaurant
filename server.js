require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Menu = require("./model/menu");
const cors = require("cors");
const stripe = require("./routes/stripe");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const corsOptions = {
  mode: "no-cors",
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const menuRoutes = require("./routes/menu");

app.use("/menu", menuRoutes);
app.use("/stripe", stripe);

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

connect().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
