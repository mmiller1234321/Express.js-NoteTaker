// sets up the router for the notes
const router= require('express').Router();

const notes = require('./notes');

router.use('/notes', notes);

module.exports = router;