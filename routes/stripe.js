const stripe = require("stripe")(
  "sk_test_51NX46VHjaZSuwtGVuhrxJjf27hL747yiqaeSk4VT3tNgvgrsmKywiXIZgZ9YFYaseesq6P5UJjK8rLoEwYIDlGpb002W8EhVcJ"
);
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
          images: [item.img],
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
    shipping_address_collection: {
      allowed_countries: ["GB"],
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `https://stackburger.netlify.app
/success`,
    cancel_url: `https://stackburger.netlify.app
/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
