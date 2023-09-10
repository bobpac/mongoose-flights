const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// POST /tickets/new
router.post('/:id/new', ticketsCtrl.create);

module.exports = router;