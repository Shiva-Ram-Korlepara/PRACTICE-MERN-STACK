const User = require('../models/User');
const Order = require('../models/Order');
const Item = require('../models/Item');

const addItem = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const newItem = new Item({ name, price, description });
        await newItem.save();
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const removeItem = async (req, res) => {
    const { itemId } = req.body;

    try {
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {   
        res.status(500).json({ message: 'Server error' });
    }
};

const updateItem = async (req, res) => {
    const { itemId, name, price, description } = req.body;

    try {
        const item = await Item.findByIdAndUpdate(itemId, { name, price, description }, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const viewOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').populate('items.item', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addItem,
    removeItem,
    updateItem,
    viewOrders
};