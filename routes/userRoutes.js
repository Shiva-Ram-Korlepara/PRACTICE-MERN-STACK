const express = require('express');
const { getMenu, addToCart, removeFromCart, placeOrder, getOrderHistory } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { autorization } = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(protect, autorization('user'));

router.get('/menu', protect, getMenu);
router.post('/cart/add', protect, addToCart);
router.post('/cart/remove', protect, removeFromCart);
router.post('/order/place', protect, placeOrder);
router.get('/order/history', protect, getOrderHistory);

module.exports = router;