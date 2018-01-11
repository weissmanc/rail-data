import { Picker} from 'meteor/meteorhacks:picker';
import {currPointStatus} from '/server/lib/currStates.js';

// Include the body-parser NPM package using the Meteor.npmRequire method we
// get from the meteorhacks:npm package.
import bodyParser from 'body-parser';

//Module globals ==================


// Define our middleware using the Picker.middleware() method.
//TODO - add middleware that will cancel out immediately if the header does
//not contain a valid JWT
Picker.middleware( bodyParser.json({limit:"5mb"}) );
Picker.middleware( bodyParser.text({limit:"5mb"}) );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

//POST method handlers
var postRoutes = Picker.filter(function(req, res) {
  //Filter for POST requests only
  return req.method == "POST";
});

//Process point updates which are just point ID and status value
//will be sent as text
//
//test with
//
//echo -e "line1\nline2\nAL-01VHLCEC5-I,1" | \
//curl -X POST -H "Content-Type: text/plain" -d @- https://mtaraildata.metro.net/point-updates?server=lr
postRoutes.route('/point-updates', function(params, req, res, next) {
  console.log('point-updates');
  //console.log(req.body);
  
  //req.body = typeof req.body === 'string' ? req.body : "";
  //console.log('body:',req.body);
  
  console.log('params:', params);
  var serverName = params.query && params.query.server;
  
  Stats.upsert({
    name:'lastUpdate',
    server:serverName
  },
  {
    $set:{
      lastUpdate: Date.now()
    }
  });
 
  var changes = [];
    
  //console.log('body:' + req.body);
   
  //Format of body.text
  var lines = req.body.split(/\n/);
  console.log('  lines:' + lines.length);
  lines.forEach((line,idx)=>{
    if(idx<2) return; //first 2 lines are info
    var tokens = line.split(',').map((str)=>{return str.replace(/("|\r)/g,'')}); //remove quotes from strings
    
    var _id = tokens[0];
    
    //Skip blanks
    if( ! _id.length ) return;
    
    var curr = currPointStatus[_id];
    var state = tokens[1];
    
    if(!curr){
      console.log(`unknown point update:${_id}` );
      return;
    }

    //Is it the same as previous?
    if( curr.state != state) {
      changes.push({
        _id,
        state,
        isAlarm: null != curr.alarmPri[state]
        });
      curr.state =  state;
    }
  });
  
  //Update database - TODO as bulk operation
  changes.forEach((change)=>{
    Points.update(
      {_id:change._id}, 
      {
        $set : {
        state:change.state,
        isAlarm: change.isAlarm,
        update: Date.now()
        },
        $inc: {
          todayCount: 1
        }
      }
    );          
  });
  
  var msg = `server ${serverName} made ${changes.length} point state changes.`;
  console.log(msg);
  res.setHeader( 'Content-Type', 'text/plain' );
  res.statusCode = 200;
  res.end( msg);  
});


//TODO - temporary load point config from processed AIM config files
//Need a script to generate the data
postRoutes.route('/point-load', function(params, req, res, next) {
  console.log('point-load');
  
  //Format of body.text
  var tokenInfo={
    _id:0,
    line:1,
    location:2,
    description:3,
    sys:4,
    sub:5,
    states:(arr)=>{
      //idx 6
      return arr[6].split('|');
    },
    offNormals:(arr)=>{
      var offNormals = arr[7];
      if(0 === offNormals.length) return [];
      return offNormals.split('|');
    },
    alarmPri:(arr)=>{
      return arr[8].split('|').map((str)=>{
        return ["EVENT","INFO","NULL"].includes(str) ? null : str;
      });
    }
  };

  var lines = req.body.split('\n');
  lines.forEach((line,linenum)=>{
    var doc = {};
    var tokens = line.split(',');
    
    Object.getOwnPropertyNames(tokenInfo).forEach((fieldName)=>{
      var field = tokenInfo[fieldName];
      if( typeof field === 'function'){
        doc[fieldName] = field(tokens);
      }
      else {
        doc[fieldName] = tokens[field];
      }
    });
    
    //console.log(doc);
    Points.insert(doc);
  });
  
  console.log('inserted rows:' + lines.length);
  console.log('TODO - gotta refractor currStates.js to reset here#########');
  
  res.setHeader( 'Content-Type', 'text/plain' );
  res.statusCode = 200;
  res.end( "Inserted rows:" + lines.length);

});



