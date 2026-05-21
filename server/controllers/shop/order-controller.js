const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Create order directly (no payment gateway)
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "pending",
      paymentMethod: paymentMethod || "cod",
      paymentStatus: paymentStatus || "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newOrder.save();

    // Deduct stock
    for (let item of newOrder.cartItems) {
      let product = await Product.findById(item.productId);
      if (product) {
        product.totalStock -= item.quantity;
        await product.save();
      }
    }

    // Clear cart
    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length)
      return res.status(404).json({ success: false, message: "No orders found!" });

    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found!" });

    res.status(200).json({ success: true, data: order });
  } catch (e) {
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

module.exports = { createOrder, getAllOrdersByUser, getOrderDetails };
