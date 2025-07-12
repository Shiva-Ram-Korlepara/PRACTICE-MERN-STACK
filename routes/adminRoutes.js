const express = require('express');
const { addItem, removeItem, updateItem, viewOrders } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { autorization } = require('../middleware/roleMiddleware');
const router = express.Router();

router.use(protect, autorization('admin'));

router.post('/item/add', addItem);
router.delete('/item/remove', removeItem);
router.put('/item/update', updateItem);
router.get('/orders', viewOrders);

module.exports = router;