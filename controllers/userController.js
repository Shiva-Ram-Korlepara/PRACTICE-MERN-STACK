const User = require('../models/User');
const Item = require('../models/Item');
const Order = require('../models/Order');

const getMenu = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const addToCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const user = await User.findById(req.user._id);
        if (!user.cart) {
            user.cart = [];
        }
        
        const existingItemIndex = user.cart.findIndex(cartItem => cartItem.item.toString() === itemId);
        if (existingItemIndex > -1) {
            user.cart[existingItemIndex].quantity += quantity;
        }
        else {
            user.cart.push({ item: itemId, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const removeFromCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const user = await User.findById(req.user._id);
        if (!user.cart) {
            return res.status(404).json({ message: 'No items in cart' });
        }
        
        const existingItemIndex = user.cart.findIndex(cartItem => cartItem.item.toString() === itemId);

        if (existingItemIndex > -1) {
            if (user.cart[existingItemIndex].quantity > quantity) {
                user.cart[existingItemIndex].quantity -= quantity;
            }
            else if (user.cart[existingItemIndex].quantity === quantity) {
                user.cart.splice(existingItemIndex, 1);
            }
            else {
                return res.status(400).json({ message: 'Quantity exceeds items in cart' });
            }
        }
        else {
            user.cart.push({ item: itemId, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.item');
        if (!user || !user.cart || user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalAmount;
        user.cart.array.forEach(element => totalAmount += element.price * element.quantity);

        const order = new Order({
            user: user._id,
            items: user.cart.map(cartItem => ({
                item: cartItem.item._id,
                quantity: cartItem.quantity
            })),
            totalAmount: totalAmount
        });

        await order.save();
        user.orders.push(order._id);

        user.cart.array.forEachh(element => Item.findById(element.item.toString).quantity -= element.quantity)

        user.cart = [];
        await user.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    }

    catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const getOrderHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('orders');
        if (!user || !user.orders || user.orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.status(200).json(user.orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getMenu,
    addToCart,
    removeFromCart,
    placeOrder,
    getOrderHistory
};