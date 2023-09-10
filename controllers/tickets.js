const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  create
};

async function create(req, res, next) {
  console.log(req.params)
  console.log(req.body)

  req.body.flightNo = parseInt(req.body.flightNo);
  req.body.price = parseInt(req.body.price)
  req.body.flight = req.params.id;

  console.log(req.body);
  try {
    await Ticket.create(req.body);
    tickets = await Ticket.find({flight: req.body.flight})
    console.log(tickets)
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flights index after we implement it
    res.redirect(`/flights/${req.params.id}`
    ); 
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
  }
}