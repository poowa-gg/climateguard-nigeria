import express from 'express';
import { prepare } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/reports', (req, res) => {
  try {
    const { lat, lon, radius = 50 } = req.query;
    
    const reports = prepare(`
      SELECT id, report_type, location, latitude, longitude, status, created_at
      FROM security_reports 
      WHERE created_at > datetime('now', '-7 days')
      ORDER BY created_at DESC 
      LIMIT 50
    `).all();
    
    if (reports.length === 0) {
      return res.json(getMockSecurityData());
    }
    
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/report', authenticateToken, (req, res) => {
  try {
    const { report_type, description, location, latitude, longitude } = req.body;
    
    const stmt = prepare(`
      INSERT INTO security_reports (user_id, report_type, description, location, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      req.user.userId,
      report_type,
      description,
      location,
      latitude,
      longitude
    );
    
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      message: 'Security report submitted. Authorities will be notified.' 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/tips', (req, res) => {
  const securityTips = [
    {
      category: 'Farm Security',
      tips: [
        'Install perimeter fencing and gates',
        'Use motion-sensor lights in vulnerable areas',
        'Keep valuable equipment locked when not in use',
        'Maintain clear sightlines around buildings',
        'Join or form a farm watch group with neighbors'
      ]
    },
    {
      category: 'Personal Safety',
      tips: [
        'Always inform someone of your location when working alone',
        'Keep emergency contacts readily accessible',
        'Carry a charged mobile phone at all times',
        'Be aware of surroundings, especially during early morning/late evening',
        'Report suspicious activities immediately'
      ]
    },
    {
      category: 'Livestock Protection',
      tips: [
        'Use livestock guardian animals (dogs, donkeys)',
        'Implement proper fencing and enclosures',
        'Brand or tag animals for identification',
        'Conduct regular headcounts',
        'Install cameras in high-value areas'
      ]
    },
    {
      category: 'Emergency Response',
      tips: [
        'Keep first aid kit accessible',
        'Know locations of nearest police stations and hospitals',
        'Have emergency evacuation plan',
        'Store important documents securely',
        'Maintain insurance coverage'
      ]
    }
  ];
  
  res.json(securityTips);
});

router.get('/emergency-contacts', (req, res) => {
  const { state } = req.query;
  
  const contacts = {
    lagos: {
      police: '112',
      emergency: '767, 112',
      fire: '112',
      ambulance: '112',
      nema: '+234 1 6289851'
    },
    default: {
      police: '112',
      emergency: '112',
      fire: '112',
      ambulance: '112',
      nema: '0800 10 111 10'
    }
  };
  
  res.json(contacts[state?.toLowerCase()] || contacts.default);
});

function getMockSecurityData() {
  return [
    {
      id: 1,
      report_type: 'theft',
      location: 'Ogun State',
      latitude: 6.9082,
      longitude: 3.3470,
      status: 'investigating',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 2,
      report_type: 'suspicious_activity',
      location: 'Lagos State',
      latitude: 6.5244,
      longitude: 3.3792,
      status: 'resolved',
      created_at: new Date(Date.now() - 259200000).toISOString()
    }
  ];
}

export default router;
