var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/api/airlines', function (req, res, next) {
  models.airlinesModel.getAirlines()
  .then(function(data) {
    return res.json(data)
  })
  .catch(function(error){
    return res.json([]);
  })
});

router.get('/api/airports', function (req, res, next) {
  var q = req.query.q;

  models.airportsModel.getAirports(q)
  .then(function(data) {
    return res.json(data);
  })
  .catch(function(error){
    return res.json([]);
  })
});

router.get('/api/search', function (req, res, next) {
  var date = req.query.date;
  var from = req.query.from;
  var to = req.query.to;

  models.flightSearchModel.getBySearch(date, from, to)
  .then(function(data) {
    return res.json(data)
  })
  .catch(function(error){
    return res.json([])
  })
});

module.exports = router;