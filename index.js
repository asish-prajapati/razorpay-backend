const express = require("express");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const razorpay = new Razorpay({
  key_id: "rzp_test_K06AuAIWEyth7a",
  key_secret: "UjNPx1wJMLkeohzU4wCmwBkO",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 1;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
