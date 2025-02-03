// src/routes/hostelRoutes.js
const express = require('express');
const  bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/rooms', bookingController.getAvailableRooms);
router.post('/book', bookingController.createBooking);

module.exports = router;