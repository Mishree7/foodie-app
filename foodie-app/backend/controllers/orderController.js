import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user.id
  });

  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};