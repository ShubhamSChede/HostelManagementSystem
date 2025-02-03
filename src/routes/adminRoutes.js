// src/routes/adminRoutes.js
const express = require('express');
const bookingController  = require('../controllers/bookingController');
const router = express.Router();

router.get('/requests', bookingController.getBookingRequests);
router.post('/approve', bookingController.approveBooking);
router.post('/reject', bookingController.rejectBooking);

module.exports = router;