// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '182800085390969', // your App ID
        'clientSecret'  : '741872c1462f4d051f0658f70f0f5e75', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback' // 8080 localhost?
    },

    'googleAuth' : {
        'clientID'      : '344717403288-f5ikcgknidl5k0k8a15fg15nsh99ls05.apps.googleusercontent.com',
        'clientSecret'  : 'GOMcIE-F2rtxQKBniPSJCuUN',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};