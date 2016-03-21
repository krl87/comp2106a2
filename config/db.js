// create public connection string
module.exports = {

    //local
    //'url': 'mongo://localhost/test';

    //live on mlab
    'url': 'mongodb://kayley:password@ds064278.mlab.com:64278/thisisadatabase',
    'githubClientId': 'b025da6e985ebed86c12',
    'githubClientSecret': 'b1b6cd1f9ea44afc4a57d54a62dfc210e6c18d93',
    'githubCallBackUrl': 'http://localhost:3000/auth/github/callback'
};