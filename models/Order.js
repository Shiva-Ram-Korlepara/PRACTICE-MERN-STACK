const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requester',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    proofOfDelivery: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);