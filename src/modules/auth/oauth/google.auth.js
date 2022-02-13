const { google } = require('googleapis');
var rp = require('request-promise');
const  jwt = require('jsonwebtoken');
let service = require('./user.service')
const {User,sequelize, Sequelize} = require('../../../../models');
const { lock } = require('../routes/auth.route');

// Each API may support multiple version. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.



exports.google = (req, res) => {
  console.log("origin",req.get('origin'));
  console.log("host",req.get('host'))
  let redirect_uri = req.get('origin') ? req.get('origin') : 'https://' + req.get('host');
  const oauth2Client = new google.auth.OAuth2(
    '63185176944-liii4cl4p1oj30suhi75ouekpdact3jo.apps.googleusercontent.com',
    'asdasasdsada1232',
    redirect_uri
  );
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    'profile',
    'email',
    // 'https://www.googleapis.com/auth/user.addresses.read',
    // 'https://www.googleapis.com/auth/user.phonenumbers.read'
    // 'https://www.googleapis.com/auth/contacts'

  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    approval_prompt: 'force',

    // If you only need one scope you can pass it as a string
    scope: scopes
  });
  res.json({ status: 'success', url: url })
}


/**
 * login user
 */
exports.login = async (req, res) => {
  try {
    let response = await service.login({ emailId: req.body.emailId, password: req.body.password })
    return res.json({ status: "success", data: response });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ status: 'Error', msg: err.message })
    }
    res.status(403).send( err )
  }



}

exports.token = async (req, res) => {
  let redirect_uri = req.get('origin') ? req.get('origin') : 'https://' + req.get('host');
  console.log("redirect uri", redirect_uri);
  const oauth2Client = new google.auth.OAuth2(
    '63185176944-liii4cl4p1oj30suhi75ouekpdact3jo.apps.googleusercontent.com',
    'yU2Y31miEpraEPmnGeP4avjE',
    redirect_uri
  );

  try {
    let code = req.query.code;
    console.log("code is", req.query.code);
    const { tokens } = await oauth2Client.getToken(code)

    res.json(tokens);
  } catch (err) {
    console.log("Error in getting the tokens", err)
  }

}

exports.getUserInfo = (req, res) => {

  let getEmailAddresses = async () => {
    var options = {
      uri: 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses',
      qs: {
        key: 'AIzaSyAEKRRgWaBxpgWFJdr6ZkWkePdRKW3ZmxI'
      },
      headers: {
        Authorization: 'Bearer' + ' ' + req.query.access_token
      },
      json: false // Automatically parses the JSON string in the response
    };

    let emailAddressesRes = await rp.get(options);
    //console.log("emailAddressesRes"+JSON.stringify(emailAddressesRes))
    let emailAddressesData = JSON.parse(emailAddressesRes)
    return emailAddressesData.emailAddresses[0].value;
  }

  getEmailAddresses()
    .then(resp => {

      return service.checkEmailExists({ email: resp })
    }).then(resp => {
      if (resp) {
        //user exists
      } else {


      }
    })
}

exports.authorizeUser = (req, res) => {

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  token = token.slice(7, token.length);
  console.log("token is", token);

  return service.authorise({ id_token: token, access_token: '' })
    .then(resp => { res.json({ status: "user authorised", data: resp }) })


}

exports.name = (req, res) => {
  res.json({ name: 'satyam kumar' })
}

exports.createUser = (req, res) => {
  service.insertUser(req.body)
  .then(response => res.json({ status: 'sucess', msg: 'User is Created' }))
  .catch(err=>{res.status(500).json({msg:"Not able to create user, Please try again."})});

}

//this function can be a azure function app
exports.updateUser = async (req, res) => {
  console.log("data is",req.body);
  let {userId} = req.body;
  try{
    await User.update({isAvailable:1},{where:{id:userId}});
    //ack the message message queue
    res.json({msg:"User set is available"});
  }catch(err){
    console.log("Error is",err);
  }
}


exports.decodeJwtToken = (req, res) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  token = token.slice(7, token.length);
  console.log("token",token);
  jwt.verify(token, 'secret', function (err, decoded) {
    if (err) {
      let err = { status: "err", msg: "Invalid token" }
      res.status(200).json({ err });
    } else {
      if (decoded.exp * 1000 < Date.now()) {
        let err = { status: "Error", msg: "Token Expired" };
        res.status(401).json({ err });
      } else {
        if (decoded.data)
          req.userInfo = decoded.data;
        req.userInfo.token = req.body.token;
        res.json(req.userInfo);
      }
    }
  });
}

exports.getOnlineWishmasters = async (req, res)=>{
      
      let query = {
        where:{role:"wishmaster", isAvailable:1},
        lock: true,

      };
        const partners = await sequelize.transaction(async (t) => {
        const {result} = req.query; 
        console.log("result",result);
        if( result == 1){
          query['limit'] = 1;
          query['transaction'] = t
        };
        let user = await User.findAll(query);
        let query1= {where:{id:user[0].id}};
          query1['transaction'] = t
          query1['lock'] = true;
        let user2 =  await User.findAll(query1);
        return user2;
  
      });

      

      try{
          let masters = await partners;
          res.json(masters);
      }catch(err){
        console.log("error is",err);
      }
}

exports.bookDeliveryPartner = async (req, res)=>{
  const {wishmasterId} = req.body;

    const partners = async ()=>{
      return await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED},async t => {
        let query = {
          where:{role:"wishmaster", isAvailable:1},
          transaction:t,
          lock:true
        };
        let user = await User.findOne(query);
        if(user){
          let updateQuery = {
            isAvailable:0
          }
          console.log("user is",user.id);
          await User.update(updateQuery,{where:{id:user.id},transaction:t});
          return user
        }else{
          return Promise.reject("404");
          //return Promise.resolve({msg:"No parter found"});
        }
        
    
      });
    }
  try{
    let masters = await partners();
    return res.status(200).json({data:masters});
  }catch(err){
    console.log("error is",err);
    if(err == 404){
      return res.status(404).json({"msg":"No delivery partner found"});
    }
    res.status(500).json({msg:"Not able to book any delivery partner"});
  }

}

exports.updateDeliveryPartner = async (req,res)=>{
  const {wishmasterId, isAvailable} = req.body;
  try{  
    await User.update({isAvailable:isAvailable},{where:{id:wishmasterId}});
    return res.status(200).json({msg:"Staus changed to booked"});
  }catch(err){
    console.log("Error in changin status",err);
    return res.status(500).json({msg:"Not able to change status"});
  }

  
}
