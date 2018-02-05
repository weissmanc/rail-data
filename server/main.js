import { Meteor } from 'meteor/meteor';

/*
Move today count to yesterday count. No efficient way to do this in mongo unfortunatley
*/
var rotatePointUpdateCounts = function(){

  var dt = new Date();

  //console.log('rotatePointUpdateCounts called');
  Points.find().forEach((point)=>{

    //Always rotate 31 day counters
    var $push = {
      statusDayCount: {
        $each: [0],
        $slice: 31
      },
      alarmDayCount: {
        $each: [0],
        $slice: 31
      },
    };

    //Rotate 52 week counters on Sundays
    if(0 === dt.getDay()){
      $push.statusWeekCount = {
        $each: [0],
        $slice: 52
      };
      $push.alarmWeekCount = {
        $each: [0],
        $slice: 52
      };
    }
    //Rotate 12 month counters on first of month
    if(1 === dt.getDate()){
      $push.statusMonthCount= {
        $each: [0],
        $slice: 12
      };
      $push.alarmMonthCount= {
        $each: [0],
        $slice: 12
      };
    }
    Points.update({
        _id: point._id,
      },
      {
        $push
      });
    });
  };

  SyncedCron.add({
    name: 'Rotate point update counts',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('at 00:00');
    },
    job: function() {
      rotatePointUpdateCounts();
    }
});

Meteor.startup(() => {
	console.log('main startup functions');

    SyncedCron.start();

});
