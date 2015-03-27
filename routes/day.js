var router = require('express').Router();
var models = require('../models');

router.use('/:id', require('./attractions'));

// var day = models.Day.find(); 
// get all days
router.get('/', function(req, res, next) {
  models.Day
    .find()
    .populate('hotel restaurants thingsToDo') 
    .exec(function(err, popDays) {
      if (err) return next (err);
      console.log('get /days');
      console.log(popDays);
      res.json(popDays);
    });
});

// post a new day
router.post('/', function(req, res, next) {
  var countDays = models.Day.count({}, function(err, count){
    if (err) return next (err);
    var newDayNum = count + 1;
    console.log(count);
    // or models.Day.create({number: })
    var newDay = new models.Day({number: newDayNum, hotel: null});
    newDay.save();
    res.json(newDay);
    //res.redirect('/days/' + newDayNum);
  });
});

// when you click day buttons - whether new or old
// get a particular day's activities
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  console.log('id', + id);
  models.Day
        .find({number: id})
        .populate('hotel restaurants thingsToDo')
        .exec(function(err, popDay) {
          // console.log(popDay);
          res.send(popDay);
        });
  });

// delete one day
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  models.Day.remove({number: id}, function (err) {
    if (err) return next (err);
  });
});

// when you add activity from control panel 
// router.post('/day/:num/addActivity', function (req, res, next) {
//   models.Day.find({number: req.params.num})
//   // .update();
  
// }); 

module.exports = router; 