// expose our config directly to our application using module.exports
module.exports = 
{

    'facebookAuth' : {
        'clientID'      : process.env.FB_AUTH_CID, // your App ID
        'clientSecret'  : process.env.FB_AUTH_CS,// your App Secret
        'callbackURL'   : process.env.FB_AUTH_CU// 8080 localhost?
    },

    'googleAuth' : {
        'clientID'      :process.env.GO_AUTH_CID,
        'clientSecret'  :process.env.GO_AUTH_CS,
        'callbackURL'   :process.env.GO_AUTH_CU
    },

    'dashboardConfigure' : {
        'projectId':process.env.KEEN_PID,
        'masterKey':process.env.KEEN_MK,
        'writeKey':process.env.KEEN_WK,
        'readKey':process.env.KEEN_RK,
        'baseUrl': process.env.KEEN_BU
    },

    'secret' : process.env.SECRET

}; 
// {

//     'facebookAuth' : {
//         'clientID'      : 'xxxxxxxxxxx', // your App ID
//         'clientSecret'  : 'xxxxxxxxxxx', // your App Secret
//         'callbackURL'   : 'http://localhost:3000/auth/facebook/callback' // 8080 localhost?
//     },

//     'googleAuth' : {
//         'clientID'      : 'xxxxxxxxxxx',
//         'clientSecret'  : 'xxxxxxxxxxx',
//         'callbackURL'   : 'http://localhost:3000/auth/google/callback'
//     },

//     'dashboardConfigure' : {
//         'projectId': 'xxxxxxxxxxx',
//         'masterKey': 'xxxxxxxxxxx',
//         'writeKey': 'xxxxxxxxxxx',
//         'readKey': 'xxxxxxxxxxx',
//         'baseUrl': "https://api.keen.io/"
//     },

//     'secret' : 'xxxxxxxxxxx'

// }; 