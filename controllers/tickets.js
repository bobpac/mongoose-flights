const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  create,
  new: newTicket
};

// Create a new ticket in mongoose
async function create(req, res, next) {

  req.body.flightNo = parseInt(req.body.flightNo);
  req.body.price = parseInt(req.body.price)
  req.body.flight = req.params.id;

  try {
    await Ticket.create(req.body);
    // Always redirect after CUDing data
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
  }
}

async function newTicket(req, res, next) {
  const flight = await Flight.findById(req.params.id);
  res.render(`tickets/new`, { flightId: req.params.id });
}
