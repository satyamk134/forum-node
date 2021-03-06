const { google } = require('googleapis');
var rp = require('request-promise');
var jwt = require('jsonwebtoken');
let service = require('./user.service')
// Each API may support multiple version. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.



exports.google = (req, res) => {
  console.log("origin url is",req.get('origin'))
  console.log("host is base url is",req.get('host'))
  let redirect_uri = req.get('origin')?req.get('origin'):'http://'+req.get('host');
const oauth2Client = new google.auth.OAuth2(
    '63185176944-liii4cl4p1oj30suhi75ouekpdact3jo.apps.googleusercontent.com',
    'asdasasdsada1232',
    redirect_uri
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/user.addresses.read',
  'https://www.googleapis.com/auth/user.phonenumbers.read'	
  // 'https://www.googleapis.com/auth/contacts'

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


/**
 * login user
 */
exports.login = (req, res) => {
    service.login({emailId:req.body.emailId, password: req.body.password})
    .then(response => {
        res.json({status:'success',data:response})
    })
    .catch(err => {
      console.log("Error in login the user",err);
      if(err instanceof Error){
          res.status(500).json({status:'Error',msg:err.message})
      }

      res.status(403).send({err})
    })
}

exports.token = async (req, res)=>{
  let redirect_uri = req.get('origin')?req.get('origin'):'http://'+req.get('host');
  const oauth2Client = new google.auth.OAuth2(
    '63185176944-liii4cl4p1oj30suhi75ouekpdact3jo.apps.googleusercontent.com',
    'yU2Y31miEpraEPmnGeP4avjE',
    redirect_uri
);

  try {
    let code = req.query.code;
    const {tokens} = await oauth2Client.getToken(code)
   
    res.json(tokens);
  } catch(err) {
    console.log("Error in getting the tokens",err)
  }
  
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

exports.createUser = (req, res) => {
    
   
    service.insertUser(req.body)
    .then(response=>res.json({status:'sucess',msg:'User is Created'}))
}
