const express = require('express'); // Import Express.js framework
const path = require('path'); // Import path module for file paths
const api = require('./routes/index.js'); // Import API routes

const PORT = process.env.PORT || 3001; // Set port for the server

const app = express(); // Create Express application instance

// Middleware for parsing JSON and urlencoded form data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api', api); 

app.use(express.static('public')); // Serve static files from the 'public' directory

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html')) // Send the index.html file as response
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html')) // Send the notes.html file as response
);

// Wildcard route to redirect users to the index
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')) // Send the index.html file for all other routes
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`) // Listen for connections on the specified port
);
