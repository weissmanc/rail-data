//Kind of hacky until / unless AIM can send us only changes and if state is off-normal

export var currPointStatus = {};

Meteor.startup(() => {
	console.log('Initialize curr point state info');
	var count = 0;
	Points.find().forEach((point)=>{
	    count++;
	    currPointStatus[point._id] = {
	        state: point.state, //current state in database
	        alarmPri: point.alarmPri //array of alarm prior for each state value
	    };
	});
	console.log(`  ${count} points in database`);
	
});