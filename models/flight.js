const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

//function to add year to a date
function addYearsToDate(_date,_noOfYears) 
 {
  return new Date(_date.setFullYear(_date.getFullYear() + _noOfYears));      
 }

//usage of the function addYearsToDate
const todayDate = new Date();

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: [ 'AUS', 'DFW', 'DEN', 'LAX', 'SAN' ],
    default: 'DEN'
  },
  arrival: {
    type: Date
  },
},{
  timestamps: true
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: [ 'American', 'Southwest', 'United' ]
  },
  airport: {
    type: String,
    enum: [ 'AUS', 'DFW', 'DEN', 'LAX', 'SAN' ],
    default: 'DEN'
  },
  flightNo: {
    type: Number
  },
  departs: {
    type: Date,
    default: addYearsToDate(todayDate,1)
  },
  destinations: [ destinationSchema ]

  },{
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);