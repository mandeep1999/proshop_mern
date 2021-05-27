import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order Items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc get order by id
// @route get /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  //to get additional details of user of the order with 2nd paramters indicating the fields needed
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc update order to paid
// @route get /api/orders/:id
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //to get additional details of user of the order with 2nd paramters indicating the fields needed
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc get logged in users orders
// @route get /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  //to get additional details of user of the order with 2nd paramters indicating the fields needed
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders, updateOrderToPaid };
