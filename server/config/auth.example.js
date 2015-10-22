// expose our config directly to our application using module.exports
module.exports = 
 
{

    'facebookAuth' : {
        'clientID'      : 'xxxxxxxxxxx', // your App ID
        'clientSecret'  : 'xxxxxxxxxxx', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback' // 8080 localhost?
    },

    'googleAuth' : {
        'clientID'      : 'xxxxxxxxxxx',
        'clientSecret'  : 'xxxxxxxxxxx',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    },

    'dashboardConfigure' : {
        'projectId': 'xxxxxxxxxxx',
        'masterKey': 'xxxxxxxxxxx',
        'writeKey': 'xxxxxxxxxxx',
        'readKey': 'xxxxxxxxxxx',
        'baseUrl': "https://api.keen.io/"
    },

    'secret' : 'xxxxxxxxxxx'

}; 

