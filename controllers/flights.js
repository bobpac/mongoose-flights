const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  update,
  create
};

async function index(req, res, next) {
  const flights = await Flight.find({});
  res.render('flights/index', { title: 'Mongoose Flights' , flights });
}

async function show(req, res, next) {
  // Populate the destinations array with destination docs instead of ObjectIds
  const flight = await Flight.findById(req.params.id).populate('destinations');
    // Populate the tickets
  const tickets = await Ticket.find({flight: req.params.id})
  res.render('flights/show', { title: 'Flight Detail', flight, tickets});
}

function newFlight(req, res, next) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function update(req, res, next) {

  try {
    await Flight.updateOne(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flights index after we implement it
    res.redirect(`/flights/${req.params.id}`); // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function create(req, res, next) {
  req.body.flightNo = parseInt(req.body.flightNo);
  if (req.body.departs === '') {
    delete req.body.departs;
  }
  console.log(req.body);
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flights index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}