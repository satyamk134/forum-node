const { google } = require('googleapis');
var rp = require('request-promise');
var jwt = require('jsonwebtoken');
let service = require('./user.service')
// Each API may support multiple version. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.

exports.login = (req, res) => {
   
const oauth2Client = new google.auth.OAuth2(
    '311992152127-fcvfo5857jfgo0ef9u113iqsc3muihlt.apps.googleusercontent.com',
    'MKQR5jcMIW78qGLVkHsOnFdx',
    'http://localhost:4200'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/contacts'

];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  approval_prompt:'force',

  // If you only need one scope you can pass it as a string
  scope: scopes
});
console.log("url is",url)
res.json({status:'success', url:url })
}

exports.token = async (req, res)=>{
  console.log('came to get token',req.query);
  const oauth2Client = new google.auth.OAuth2(
    '311992152127-fcvfo5857jfgo0ef9u113iqsc3muihlt.apps.googleusercontent.com',
    'MKQR5jcMIW78qGLVkHsOnFdx',
    'http://localhost:4200'
);

// var options = {
//   uri: 'https://people.googleapis.com/v1/',
//   qs: {
//       access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
//   },
//   headers: {
//       'User-Agent': 'Request-Promise'
//   },
//   json: true // Automatically parses the JSON string in the response
// };

// rp.get()
  let code = req.query.code;
  const {tokens} = await oauth2Client.getToken(code)
  //console.log("tokens are",tokens)
  console.log("support apis are",google.getSupportedAPIs())
  res.json(tokens);
}

exports.getUserInfo = (req, res) => {

  let getEmailAddresses = async ()=>{
    var options = {
      uri: 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses',
      qs: {
        key: 'AIzaSyAEKRRgWaBxpgWFJdr6ZkWkePdRKW3ZmxI'
      },
      headers: {
        Authorization: 'Bearer'+ ' '+req.query.access_token
      },
      json: false // Automatically parses the JSON string in the response
    };
  
    let emailAddressesRes = await rp.get(options);
    //console.log("emailAddressesRes"+JSON.stringify(emailAddressesRes))
    let emailAddressesData = JSON.parse(emailAddressesRes)
    return emailAddressesData.emailAddresses[0].value;
  }

  getEmailAddresses()
  .then(resp=>{
    console.log("resp is",resp)
        return service.checkEmailExists({email:resp}) 
  }).then(resp=>{
      if(resp) {
          //user exists
      } else {
        //user don't exists, so create account
        //take email, firstname, lastname from jwt token
        //return service.createUser(req.toke)(service.decodeToken)
        
      }
  })
  

  // let checkIfEmailAlreadyExists = ()=>{
  //   emailRes
  // }

  


  
  //console.log("email address are",emailAddressesRes);
  
  // let concatReqOptions = {
  //   uri: 'https://www.google.com/m8/feeds/contacts/satyamk134@gmail.com/full',
  //   qs: {
  //     key: 'AIzaSyAEKRRgWaBxpgWFJdr6ZkWkePdRKW3ZmxI'
  //   },
  //   headers: {
  //     Authorization: 'Bearer'+ ' '+req.query.access_token
  //   },
  //   json: true
  // }

  // let contacts = await rp.get(concatReqOptions);
  // console.log('contacts are',contacts)

  //res.json({emails:JSON.parse(emailAddressesRes), contacts:contacts})

  
}

exports.authorizeUser = (req, res)=>{

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token = token.slice(7, token.length);
   
    return service.authorise({id_token:token, access_token:''})
            .then(resp=>{res.json({status:"user authorised",data:resp})})


}





exports.name = (req, res)=>{
  res.json({name:'satyam kumar'})
}
