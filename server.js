const express = require("express");
const app = express();

app.use(express.static("public"));

//test secretAPI Key
const stripe = require("stripe")(
  "sk_test_51K93Nw2RoEQoTtUBclN1XMi0pEQph04U9kTDSpnHI55c4iTgn7JLSoTGS8bSroDX2OGeHnjOQm9jlgwVa5brO2Al003tWPp9jS"
);

const MY_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  //チェックアウトセッションを作成
  const session = await stripe.checkout.sessions.create({
    //販売する商品を定義する
    line_items: [
      {
        price: "price_1KPRQV2RoEQoTtUBZvlE7UC3",
        quantity: 1,
      },
    ],
    mode: "payment", //subscription, setup
    success_url: `${MY_DOMAIN}/success.html`,
    cancel_url: `${MY_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(3000, console.log("server running"));
