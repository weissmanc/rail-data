import './point.html';

Template.point.helpers({
  stateText() {
    var idx = parseInt(this.state,10);
    if(isNaN(idx)) {
      return idx;
    }

    return this.states[idx];
  },
  pointFormSchema: function() {
    return Schema.point;
  },
  alarmClass() {
    //TODO might want to have a fallback to alert off normals
    //var offNormal = this.offNormals.includes(this.state);

    var idx = parseInt(this.state,10);
    idx = isNaN(idx) ? -1: idx;

    if(-1 !== idx){
      switch(this.alarmPri[idx]){
        case 'CRITICAL':
        case 'MAJOR':
          return 'bg-danger';
        case 'MINOR':
          return 'bg-warning';
        default:
          return 'bg-success';
      }
    }

    //Catch all for when a state text is not defined for a point
    return undefined;
  },
  todayCount(){
    var counts = this.statusDayCount || [];
    return counts[0] || 0;
  },
  yesterdayCount(){
    var counts = this.statusDayCount || [];
    return counts[1] || 0;
  },
});
