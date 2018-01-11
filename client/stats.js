
Template.stats.onCreated(function () {
    var instance = this;
    
    Meteor.subscribe('statistics');
});

Template.stats.helpers({
    /*isReady: function () {
        return Template.instance().XXXX.ready();
    },*/
    documents: function () {
        return Stats.find();
    },
});
