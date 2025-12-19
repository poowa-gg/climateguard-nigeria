import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prepare } from '../database/init.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, phone, password, user_type, location, latitude, longitude } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const stmt = prepare(`
      INSERT INTO users (name, email, phone, password, user_type, location, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      name, 
      email, 
      phone || null, 
      hashedPassword, 
      user_type || 'farmer', 
      location || null, 
      latitude || null, 
      longitude || null
    );
    
    const token = jwt.sign({ userId: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    console.log('Registration successful for:', email);
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: { id: result.lastInsertRowid, name, email, user_type: user_type || 'farmer' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({ 
      token,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        user_type: user.user_type,
        location: user.location
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
