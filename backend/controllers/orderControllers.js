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
    console.log(req.body);

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
            user: req.user._id,
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

const getOrdersById = async (req, res)=>{
    const order = await Order.findById(req.params.id).populate(
        "user", 
        "name email"
    );

    if(order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order Not Found")
    }
};

export { createOrder, getMyOrders, getOrdersById };