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

    'awsStorage' : {
        'accessKey': process.env.AWS_ACCESS_KEY,
        'secretKey': process.env.AWS_SECRET_KEY,
        'bucket': process.env.AWS_BUCKET
    },

    'secret' : process.env.SECRET

}; 