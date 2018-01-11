import { ReactiveDict } from "meteor/reactive-dict";
import moment from 'moment';

export const currFilters = new ReactiveDict('currFilters');


UI.registerHelper('formatTime', function(context, format) {
    format = format || 'MM/DD/YYYY';
    return moment(context || 0).format(format);
});