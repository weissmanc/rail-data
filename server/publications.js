import { publishPagination } from 'meteor/kurounin:pagination';

publishPagination(Points, {
    name: 'points-pagination',
});

Meteor.publish('statistics', function () {
  return Stats.find({});
});