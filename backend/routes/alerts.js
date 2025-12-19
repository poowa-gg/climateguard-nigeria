import express from 'express';
import { prepare } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const alerts = prepare(`
      SELECT * FROM alerts 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 50
    `).all(req.user.userId);
    
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, (req, res) => {
  try {
    const { alert_type, severity, title, message, location, latitude, longitude } = req.body;
    
    const stmt = prepare(`
      INSERT INTO alerts (user_id, alert_type, severity, title, message, location, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      req.user.userId,
      alert_type,
      severity,
      title,
      message,
      location,
      latitude,
      longitude
    );
    
    res.status(201).json({ id: result.lastInsertRowid, message: 'Alert created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id/read', authenticateToken, (req, res) => {
  try {
    prepare('UPDATE alerts SET is_read = 1 WHERE id = ? AND user_id = ?')
      .run(req.params.id, req.user.userId);
    
    res.json({ message: 'Alert marked as read' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/public', (req, res) => {
  const { lat, lon } = req.query;
  
  const publicAlerts = [
    {
      id: 1,
      alert_type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Warning',
      message: 'Expect heavy rainfall in the next 24-48 hours. Secure crops and prepare drainage.',
      location: 'Lagos State',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      alert_type: 'disease',
      severity: 'medium',
      title: 'Fall Armyworm Alert',
      message: 'Fall armyworm outbreak reported in neighboring farms. Inspect maize crops.',
      location: 'Ogun State',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  
  res.json(publicAlerts);
});

export default router;
