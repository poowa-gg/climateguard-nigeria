import express from 'express';
import { prepare } from '../database/init.js';

const router = express.Router();

router.get('/outbreaks', (req, res) => {
  try {
    const { lat, lon, radius = 50 } = req.query;
    
    let outbreaks;
    
    if (lat && lon) {
      outbreaks = prepare(`
        SELECT * FROM disease_outbreaks 
        WHERE reported_at > datetime('now', '-30 days')
        ORDER BY reported_at DESC
      `).all();
    } else {
      outbreaks = prepare(`
        SELECT * FROM disease_outbreaks 
        WHERE reported_at > datetime('now', '-30 days')
        ORDER BY reported_at DESC 
        LIMIT 20
      `).all();
    }
    
    if (outbreaks.length === 0) {
      outbreaks = getMockDiseaseData();
    }
    
    res.json(outbreaks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/report', (req, res) => {
  try {
    const { disease_name, affected_crop, location, latitude, longitude, severity } = req.body;
    
    const stmt = prepare(`
      INSERT INTO disease_outbreaks (disease_name, affected_crop, location, latitude, longitude, severity)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(disease_name, affected_crop, location, latitude, longitude, severity);
    
    res.status(201).json({ id: result.lastInsertRowid, message: 'Disease outbreak reported' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/prevention', (req, res) => {
  const { disease } = req.query;
  
  const preventionGuides = {
    'fall_armyworm': {
      disease: 'Fall Armyworm',
      crops_affected: ['Maize', 'Sorghum', 'Rice'],
      prevention: [
        'Early planting to avoid peak infestation periods',
        'Use of resistant varieties',
        'Regular field monitoring',
        'Crop rotation with non-host crops'
      ],
      treatment: [
        'Apply neem-based biopesticides',
        'Use of pheromone traps',
        'Manual removal of egg masses',
        'Chemical control as last resort'
      ]
    },
    'cassava_mosaic': {
      disease: 'Cassava Mosaic Disease',
      crops_affected: ['Cassava'],
      prevention: [
        'Use disease-free planting materials',
        'Control whitefly vectors',
        'Remove and destroy infected plants',
        'Plant resistant varieties'
      ],
      treatment: [
        'Roguing (removing infected plants)',
        'Vector control using insecticides',
        'Use of clean planting materials'
      ]
    },
    'rice_blast': {
      disease: 'Rice Blast',
      crops_affected: ['Rice'],
      prevention: [
        'Use resistant varieties',
        'Avoid excessive nitrogen fertilization',
        'Proper water management',
        'Crop rotation'
      ],
      treatment: [
        'Apply fungicides at early infection stage',
        'Improve field drainage',
        'Remove infected plant debris'
      ]
    }
  };
  
  if (disease && preventionGuides[disease]) {
    res.json(preventionGuides[disease]);
  } else {
    res.json(Object.values(preventionGuides));
  }
});

function getMockDiseaseData() {
  return [
    {
      id: 1,
      disease_name: 'Fall Armyworm',
      affected_crop: 'Maize',
      location: 'Kaduna State',
      latitude: 10.5105,
      longitude: 7.4165,
      severity: 'high',
      cases_count: 15,
      reported_at: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 2,
      disease_name: 'Cassava Mosaic Disease',
      affected_crop: 'Cassava',
      location: 'Benue State',
      latitude: 7.3333,
      longitude: 8.7500,
      severity: 'medium',
      cases_count: 8,
      reported_at: new Date(Date.now() - 432000000).toISOString()
    },
    {
      id: 3,
      disease_name: 'Rice Blast',
      affected_crop: 'Rice',
      location: 'Niger State',
      latitude: 9.0820,
      longitude: 8.6753,
      severity: 'low',
      cases_count: 3,
      reported_at: new Date(Date.now() - 604800000).toISOString()
    }
  ];
}

export default router;
