const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// POST /tickets/:id/new
router.post('/:id/new', ticketsCtrl.create);

// GET /tickets/:id/newTicket
router.get('/:id/newTicket',ticketsCtrl.newTicket)

module.exports = router;