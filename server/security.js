// =============== CUSTOM LOGIN SERVICE ==========
/*
Signup and login workflow

If for some reason the client is not logged in then it will present login and
signup links.

A new user clicks on a sign up link which then presents a form to collect their
name, email address and other info. On submit the server will send them an
email containing a link that contains a signed JWT query parameter with
all the info needed to create their account encoded in. The body will include:
    email: string address
    loginType: "signup"
    expires: integer EPOCH of when this JWT expires
    
The server will decode the JWT when a signup link is clicked, do some account validtions (make sure an account is not already created
etc.) create the user account and login the client.

An existing user will normally stay logged using existing built in Meteor
accounts to resume login in between refresh, close/open of broweser etc. If for
some reason they are not logged in (connecting from a new machine, cleared
browser data, login expired etc.) then they click on the login link. This will
open a form asking to email a new login link or enter a valid login token.

If they click on the option to email a new login token then server will
send them an email containing a link with JWT encoded login info AND a plain
text token they can enter into a login form described above. The server will also
save the temporary login token hashed in a list in their User object along with its
expiration date.

If they choose to manually enter a login token in the form then they must enter
the plain text token.

On the server side the login authentication is easy...

If clicked on a login link then decode the JWT token. It will not decode if not valid or
otherwise tampered with.
Extract username, and expiration date from payload data.
Verify not expired and that user is in database and not banned.

If user submits login form with token then server checks token
against list of hashed temporary tokens in User object, first
removing any expired ones.




*/


/*

var loginServiceName = "mtaLogin";

Accounts.registerLoginHandler(loginServiceName, function (options) {
    
    var loginInfo = options[loginServiceName];
    
    //I believe this will ONLY get called if client is not already logged in and has a resume token
    
    //Only return a value if this request is for our service. Otherwise the Accounts
    //system will pass to the next handler.
    if(!options[loginServiceName]){
        //For debug...
        console.log(`${loginServiceName} request is not for this handler`);
        
        return undefined
    }
    
    console.log(`${loginServiceName} login service called with options:`, options);
    
    //Must have an email as username
    if ( ! options.user ) handleError("username not supplied");
    
    //User must be a string
    if (typeof options.user !== 'string' ) handleError("Invalid user object supplied");
    
    //User must be in database. This will happen when user clicks on invite link sent to their email
    var user = Users.findOne({username:options.user});
    
    //Now check they have a valid token
    verifyToken(user);
});

var verifyToken = function(user){
    return true; //TODO do something
}

const handleError = (msg, throwError = true) => {
  const error = new Meteor.Error(
    403, 
    Accounts._options.ambiguousErrorMessages
      ? "Something went wrong. Please check your credentials."
      : msg
  );
  if (throwError) {
    throw error;
  }
  return error;
};

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});

var userQueryValidator = Match.Where(function (user) {
  check(user, {
    id: Match.Optional(NonEmptyString),
    username: Match.Optional(NonEmptyString),
    email: Match.Optional(NonEmptyString)
  });
  if (_.keys(user).length !== 1)
    throw new Match.Error("User property must have exactly one field");
  return true;
});

*/