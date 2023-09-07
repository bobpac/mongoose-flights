const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create
};

async function index(req, res, next) {
  const flights = await Flight.find({});
  res.render('flights/index', { flights });
}

function newFlight(req, res, next) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
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