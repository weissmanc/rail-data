import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Schema = {};
Schema.filter = new SimpleSchema({
    pntid: {
        type: String,
        optional:true,
        label: "Point Id",
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
