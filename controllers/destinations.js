const Flight = require('../models/flight');

module.exports = {
  create
};

async function create(req, res, next) {

  const flight = await Flight.findById(req.params.id);
  // need to do a string to Date conversion
  req.body.arrival = new Date(req.body.arrival);
  flight.destinations.push(req.body);
  try {
    // Save any changes made to the movie doc
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight._id}`);
}