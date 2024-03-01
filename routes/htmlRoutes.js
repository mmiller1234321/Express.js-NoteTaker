const path = require('path'); // Change import to require
const { Router } = require('express'); // No need to change this line

const router = Router();

// "/notes" responds with the notes.html file
router.get('/notes', (res) => { 
  res.sendFile(path.join(__dirname, '../public/assets/notes.html'));
});

// All other routes respond with the index.html file
router.get('*', (res) => {
  res.sendFile(path.join(__dirname, '../public/assets/index.html'));
});

module.exports = router; // Change export to module.exports
