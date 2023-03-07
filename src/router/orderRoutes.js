const express = require("express");
const { createOrder, getOrder } = require("../database/orders");
const router = express.Router();

router.get("/:reference", async (req, res) => {
  const order = await getOrder(req.params.reference);

  if (!order) {
    res.status(404).send({ status: "FAILED", error: "Order not found" });
    return;
  }

  res.send({ status: "OK", data: order });
});

//create order endpoint
router.post("/", async (req, res) => {
  const orderDate = req.body;

  orderDate.ref = (Math.random() + 1).toString(36).substring(7);

  const newOrder = await createOrder(orderDate);

  res.status(201).send({ status: "OK", data: newOrder });
});

module.exports = router;
