// src/controllers/authController.js
const prisma = require('../utils/prisma');

const authController = {
  async signup(req, res) {
    try {
      const { email, password, name, role } = req.body;
      const user = await prisma.user.create({
        data: { email, password, name, role }
      });
      res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = authController;
