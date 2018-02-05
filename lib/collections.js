import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Points = new Mongo.Collection('points');

Filters = new Mongo.Collection('filters');

Stats = new Mongo.Collection('statistics');

Schema = {};
Schema.filter = new SimpleSchema({
    pntid: {
        type: String,
        optional:true,
        label: "Point Id",
        max: 20
    },
    server:{ //This is the server that sends this point
      type: String,
      optional:true,
      label: "Server",
      max: 20
    },
    line: {
        type: String,
        optional:true,
        max: 50,
        label: "Rail Line"
    },
    location: {
        type:String,
        optional:true,
        max: 50,
        label: 'Location'
    },
    sys: {
        type:String,
        optional:true,
        max: 50,
        label: 'System'
    },
    sub: {
        type:String,
        optional:true,
        max: 50,
        label: 'Subsystem'
    },
    description: {
        type:String,
        optional:true,
        max: 200,
        label: 'Description'
    },
    isAlarm: {
        type:Boolean,
        optional:true,
        label: 'In Alarm'
    },
}, { tracker: Tracker });

Schema.point = new SimpleSchema({
  _id: {
      type: String,
      optional:false,
      label: "Point Id",
      max: 20
  },
  server:{ //This is the server that sends this point
    type: String,
    optional:false,
    label: "Server",
    max: 20
  },
  line: {
      type: String,
      optional:true,
      max: 50,
      label: "Rail Line"
  },
  location: {
      type:String,
      optional:true,
      max: 50,
      label: 'Location'
  },
  sys: {
      type:String,
      optional:true,
      max: 50,
      label: 'System'
  },
  sub: {
      type:String,
      optional:true,
      max: 50,
      label: 'Subsystem'
  },
  description: {
      type:String,
      optional:true,
      max: 200,
      label: 'Description'
  },
  isAlarm: {
      type:Boolean,
      optional:true,
      label: 'In Alarm'
  },
  state: {
    type: Number,
    optional: true
  },
  update: {
    type: Number,
    optional: true
  },
  statusDayCount: {
    type: Array,
    optional:true,
  },
  'statusDayCount.$': {
    type: Number,
    optional: true
  },
  statusWeekCount: {
    type: Array,
    optional:true,
  },
  'statusWeekCount.$': {
    type: Number,
    optional: true
  },
  statusMonthCount: {
    type: Array,
    optional:true,
  },
  'statusMonthCount.$': {
    type: Number,
    optional: true
  },
  alarmDayCount: {
    type: Array,
    optional:true,
  },
  'alarmDayCount.$': {
    type: Number,
    optional: true
  },
  alarmWeekCount: {
    type: Array,
    optional:true,
  },
  'alarmWeekCount.$': {
    type: Number,
    optional: true
  },
  alarmMonthCount: {
    type: Array,
    optional:true,
  },
  'alarmMonthCount.$': {
    type: Number,
    optional: true
  },
  //TODO add notes object array
});

Points.attachSchema(Schema.point);
