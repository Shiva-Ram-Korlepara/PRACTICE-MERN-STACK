const Order = require('../models/Order');

const getAssignedOrders = async (req, res) => {
    try {
        const driverId = req.user._id;
        const orders = await Order.find({ driver: driverId, status: 'assigned' })
            .populate('user', 'name email')
            .populate('restaurant', 'name location');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No assigned orders found.' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching assigned orders:', error);
        res.status(500).json({ message: 'Server error while fetching assigned orders.' });
    }
}