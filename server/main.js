import { Meteor } from 'meteor/meteor';

/*
Move today count to yesterday count. No efficient way to do this in mongo unfortunatley
*/
var rotatePointUpdateCounts = function(){
    //console.log('rotatePointUpdateCounts called');
    Points.find().forEach((point)=>{
        Points.update({
            _id: point._id,
        },
        {
            $set: {
                todayCount: 0,
                yesterdayCount: point.todayCount
            }
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
