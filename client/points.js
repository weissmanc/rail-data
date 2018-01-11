import './points.html';
import { currFilters } from "/client/lib/globals.js";
import moment from 'moment';

//To create mongo filter =========================

var createFilter = function(dict){
    var filter = {};
    
    //Field filters
    //TODO is this ok for boolean fields?
    ['isAlarm'].forEach((field)=>{
        dict.get(field) && (filter[field] = dict.get(field));
    });
    
    //regex filters
    ['line', 'location', 'sys','sub','description'].forEach((field)=>{
        dict.get(field) && (filter[field]= {
            $regex: dict.get(field),
            $options: "i"
        });
    });
 
    //Hack, pntid is really _id field in points collection
    dict.get('pntid') && (filter['_id']= {
        $regex: dict.get('pntid'),
        $options: "i"
    });
    
    console.log('currFilters:', currFilters.all());
        
    return filter;
    
};


Template.points.onCreated(function () {
    var instance = this;

    var pagOptions = {
        name: 'points-pagination',
        perPage:25,
        filters: {},
        sort: {
            _id: 1 //default sort. TODO allow user to change
        },
        //debug: true
    };
    this.pagination = new Meteor.Pagination(Points, pagOptions);
    
    console.log('subscribe to stats');
    this.subscribe('statistics');

    //Make changes to currFilters be reactive
    this.autorun(function () {
        console.log('points autorun for curr filters at ' + new Date().toLocaleTimeString());
        var filter = createFilter(currFilters);
        instance.pagination.filters(filter);
    });

});

Template.points.helpers({
    isReady: function () {
        return Template.instance().pagination.ready();
    },
    templatePagination: function () {
        return Template.instance().pagination;
    },
    documents: function () {
        return Template.instance().pagination.getPage();
    },
    lastUpdate: function(serverName){
        var tm = Stats.findOne({server:serverName});
        var str =  moment( (tm && tm.lastUpdate) || 0).format('MM/DD/YYYY hh:mm:ss');
        return str;
    }
});
