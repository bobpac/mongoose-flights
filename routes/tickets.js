const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// POST /tickets/:id/new
router.post('/:id/new', ticketsCtrl.create);

// GET /tickets/:id/new
router.get('/:id/new',ticketsCtrl.new)

module.exports = router;