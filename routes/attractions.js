var attractionRouter = require('express').Router({ mergeParams: true });
var models = require('../models');

// POST /days/:id/hotel
// creates a reference to the hotel
attractionRouter.post('/hotel', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$set: {hotel: req.body.id}}, function(err, cb) {
          if (err) return next (err);
          models.Day
                .find({number: id})
                .populate('hotel')
                .exec(function(err, popDoc) {
                  console.log('add hotel');
                  console.log(popDoc);
                  res.send(popDoc);
                });
        })
});

// deletes the reference of the hotel
attractionRouter.delete('/hotel', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$set: {hotel: null}}, function(err, cb) {
          if (err) return next (err);
          models.Day
                .find({number: id})
                // .populate('hotel')
                .exec(function(err, popDoc) {
                  console.log('delete hotel');
                  console.log(popDoc);
                  res.send(popDoc);
                });
        })
});

// creates a reference to a restaurant
attractionRouter.post('/restaurants', function (req, res, next) {
  var id = req.params.id;
  models.Day
        .update({number: id}, {$push: {restaurants: req.body.id}}, function(err, cb) {
          if (err) return next (err);
          models.Day
                .find({number: id})
                .populate('restaurants')
                .exec(function(err, popDoc) {
                  console.log('add restaurant');
                  console.log(popDoc);
                  res.send(popDoc);
                });
        })
});

// deletes a reference to a restaurant
attractionRouter.delete('/restaurants', function (req, res, next) {
  var id = req.params.id; 
  models.Day
        .update({number: id}, {$pull : {restaurants: req.body.id}}, function (err, cb) {
          if (err) return next(err);
          console.log('callback', cb);
          models.Day
                .find({number: id})
                .exec(function (err, popDoc) {
                  console.log(popDoc);
                  res.send(popDoc);
                })
        })
});

// creates a reference to a thing to do
attractionRouter.post('/thingsToDo', function (req, res, next) {
  var id = req.params.id;
  models.Day
    .update({number: id}, {$push: {thingsToDo: req.body.id}}, function(err, cb) {
      if (err) return next (err);
      models.Day
        .find({number: id})
        .populate('thingsToDo')
        .exec(function(err, popDoc) {
          console.log('add thingsToDo');
          console.log(popDoc);
          res.send(popDoc);
        });
    })    
});

// deletes a reference to a thing to do
attractionRouter.delete('/thingsToDo', function (req, res, next) {
  var id = req.params.id; 
  models.Day
        .update({number: id}, {$pull : {thingsToDo: req.body.id}}, function (err, cb) {
          if (err) return next(err);
          console.log('callback', cb);
          models.Day
                .find({number: id})
                .exec(function (err, popDoc) {
                  console.log(popDoc);
                  res.send(popDoc);
                })
        })
});

module.exports = attractionRouter; 