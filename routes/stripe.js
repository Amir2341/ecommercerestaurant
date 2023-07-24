const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `http://localhost:3001/success`,
    cancel_url: `http://localhost:3001/cart`,
  });

  res.redirect(303, session.url);
});

module.exports = router;
