import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../model/orderModel.js";

const createOrder = async (req, res) => {
    const {
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (cartItems && cartItems.length === 0) {
        res.status(400);
        throw new Error("No Order Items")
    } else {
        const order = new Order({
            orderItems: cartItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createOrder = await order.save();
        res.status(200).json(createOrder);
    }
};

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
}

const getOrders = async (req, res) => {
    const order = await Order.find().populate(
        "user",
        "name email"
    );
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found")
    }
}

const getOrdersById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    console.log("sjd", order);
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found")
    }
});

const updateDelivered = asyncHandler(async (req, res) => {
    console.log('id', req.params.id);
    const order = await Order.findById(req.params.id);
    
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date();
        await order.save();
        console.log("order",order);
        res.json({message:"good"})
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
})

export { createOrder, getMyOrders, getOrdersById, getOrders, updateDelivered, updateOrderToPaid };