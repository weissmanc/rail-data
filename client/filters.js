import './filters.html';
import { currFilters } from "/client/lib/globals.js";

//For Autoform
AutoForm.hooks({
  filterForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      
      currFilters.clear();
      Object.getOwnPropertyNames(insertDoc).forEach((field)=>{
        currFilters.set(field, insertDoc[field]);
      });
      
      $(".collapse").collapse('hide');

      this.event.preventDefault();
      this.done();
      // You must call this.done()!
      //this.done(); // submitted successfully, call onSuccess
      //this.done(new Error('foo')); // failed to submit, call onError with the provided error
      //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },
  }
});

Template.filters.onCreated(function () {
    console.log('filters page created.');
});

Template.filters.onRendered(function () {
    console.log('filters page rendered');
  // Can now access jQuery plugin


});

Template.filters.helpers({
  filterFormSchema: function() {
    return Schema.filter;
  },
  filterDoc: function(){
    var doc = {};

    Object.getOwnPropertyNames(currFilters.all()).forEach((field)=>{
      doc[field] = currFilters.get(field);
    });
    return doc;
  }
});

Template.filters.events({
/*  'submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    
    console.log('Filter submitted');
    
    //TODO until filters are a collection - get form values
    $('form input').each(function(index, elem){
      //console.log(this);
      var field = elem.name;
      var val = $(this).val();
      console.log('field:' + field + ' val:' + val);
      currFilters.set(field, val);
    });
    console.log('currFilters:', currFilters.all());
  },
*/
});