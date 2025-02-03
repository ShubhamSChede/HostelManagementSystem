// src/controllers/roomController.js
const roomController = {
    async getAvailableRooms(req, res) {
      try {
        const rooms = await prisma.room.findMany({
          where: { available: true }
        });
        res.json(rooms);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  
    async bookRoom(req, res) {
      try {
        const { userId, roomId, startDate, endDate, contactNumber, roomTypePreference } = req.body;
        const booking = await prisma.booking.create({
          data: {
            userId,
            roomId,
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
    }
  };

    module.exports = roomController;