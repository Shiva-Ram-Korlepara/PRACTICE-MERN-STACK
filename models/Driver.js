const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    assignedOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'}]
    }, {
    timestamps: true,
    }
);

module.exports = mongoose.model('Driver', driverSchema);