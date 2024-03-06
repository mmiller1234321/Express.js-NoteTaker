// Setup routes to modularize.
const router = require('express').Router();

const notesRouter = require('./notes'); // Correct the casing of the file path

router.use('/notes', notesRouter);

module.exports = router;
