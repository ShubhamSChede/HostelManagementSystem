// src/controllers/bookingController.js
const prisma = require('../utils/prisma'); // Added this line

const bookingController = {
  // Get rooms with their availability status
  async getAvailableRooms(req, res) {
    try {
      // Static list of all rooms
      const allRooms = ['101', '102', '103', '104', '105'];
      
      // Get current date
      const currentDate = new Date();

      // Get all active bookings
      const activeBookings = await prisma.booking.findMany({
        where: {
          AND: [
            {
              endDate: {
                gte: currentDate
              }
            },
            {
              status: 'APPROVED'
            }
          ]
        },
        select: {
          roomNumber: true
        }
      });

      // Get list of booked room numbers
      const bookedRooms = activeBookings.map(booking => booking.roomNumber);

      // Create response with room status
      const roomsWithStatus = allRooms.map(roomNumber => ({
        roomNumber,
        isAvailable: !bookedRooms.includes(roomNumber)
      }));

      res.json(roomsWithStatus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Create a new booking request
  async createBooking(req, res) {
    try {
      const { userId, roomNumber, startDate, endDate, contactNumber, roomTypePreference } = req.body;
      const booking = await prisma.booking.create({
        data: {
          userId,
          roomNumber,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          contactNumber,
          roomTypePreference
        }
      });
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all booking requests (for admin)
  async getBookingRequests(req, res) {
    try {
      const bookings = await prisma.booking.findMany({
        where: { status: 'PENDING' },
        include: {
          user: true
        }
      });
      res.json(bookings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Approve a booking
  async approveBooking(req, res) {
    try {
      const { bookingId } = req.body;
      const booking = await prisma.booking.update({
        where: { id: parseInt(bookingId) },
        data: { status: 'APPROVED' }
      });
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Reject a booking
  async rejectBooking(req, res) {
    try {
      const { bookingId } = req.body;
      const booking = await prisma.booking.update({
        where: { id: parseInt(bookingId) },
        data: { status: 'REJECTED' }
      });
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = bookingController;