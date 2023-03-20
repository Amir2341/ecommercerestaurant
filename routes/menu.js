const express = require("express");
const Menu = require("../model/menu");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    category: req.body.category,
  });
  try {
    const savedMenu = await menu.save();
    res.status(200).json(savedMenu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Menu.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedItem);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedMenu = await Menu.updateOne(
      { _id: req.params.id },
      { $set: { price: req.body.price } }
    );
    res.status(200).json(updatedMenu);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
