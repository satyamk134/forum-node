const mongoose = require('mongoose');
let model = require('../models/auth.model');
var rp = require('request-promise');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.create = (user) => {
    /**create user*/

    let createUser = async () => {
        let newUser = await User.inserOne(user);



    }

    return createUser()

}

exports.checkEmailExists = (req) => {
    return model.User.find({ emailId: req.email }).then(resp => resp.length > 0 ? true : false)

}

exports.decodeToken = (req) => {

    //let token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMTE5OTIxNTIxMjctZmN2Zm81ODU3amZnbzBlZjl1MTEzaXFzYzNtdWlobHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMTE5OTIxNTIxMjctZmN2Zm81ODU3amZnbzBlZjl1MTEzaXFzYzNtdWlobHQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAxMzYwNTY0Nzk0NTg3Mjc0MDgiLCJlbWFpbCI6InNhdHlhbWsxMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0Zzk5MkxQN2hvUFJlakdMWU4wRFJRIiwibmFtZSI6IlNhdHlhbSBLdW1hciIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLUlHaEdLRnh5M3hnL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FBS1dKSlBaLVVGZFBmNG9HYkFXVDRJdU4wYUIyc3BONncvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlNhdHlhbSIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4ODE2NDkzMCwiZXhwIjoxNTg4MTY4NTMwfQ.VjU2jWDc9WZ2Iy2Jq3cEzSMEo1VKQODUH0h5SwA2B3xeb_I3wjHy3-iwWrsXhh7_1xWnF41Dtb3o-x3IaFxF6tuu7D_wDjIzaSnSnx1uxw0T0H1266jFCMbUUhpBh8w3xcy93Vgi6C9LEqPODVMQGB0BSm5JqxJmaKfQ4sO49F7HxUazO2fIE2WxGXobi0bA1xzSwnscXJ_lgVqt-pu_vMOjK6maKA5ZXNT4BE9HC-Mj5oNNNBXlTkdkpTej8ibmXlZAC-F2_4-x4Y-ej6fK0z2dVwf9Dw0vvL5L9ZUTb57dQzaSuvUjGwcY877e23vzZMo5MqJHfXgs_LwgXbQqig'
    let token = req.token
    return jwt.verify(token, 'MKQR5jcMIW78qGLVkHsOnFdx', function (err, decoded) {
        //console.log(decoded)
        return decoded;
    })
}

exports.authorise = (tokens) => {



    let deodeToken = async () => {
        var options = {
            uri: 'https://oauth2.googleapis.com/tokeninfo',
            qs: {
                id_token: tokens.id_token
            },
            json: true // Automatically parses the JSON string in the response
        };

        let decodeToken = await rp.get(options)
        return decodeToken
    }

    let getUserInfo = (user) => {
        let dbUser = {
            firstName: user.given_name,
            lastName: user.family_name,
            emailId: user.email,
            password: 'google1234',
            provider: 'google'
        }
        return dbUser;
    }

    let authorizeUser = async () => {

        try {
            let decodeTokenInfo = await deodeToken();
            let emailExists = await this.checkEmailExists({ email: decodeTokenInfo.email });
            console.log("emailExists", emailExists)
            if (emailExists) {
                //if email exists then log the user in
            } else {
                //create the user
                let user = getUserInfo(decodeTokenInfo);
                await model.User.insertMany(user)
            }
            console.log("now go to login")
            let loginUser = await this.login({ emailId: decodeTokenInfo.email });
            return loginUser

        } catch (err) {
            console.log("err is", err);
        }





    }

    return authorizeUser()
}

exports.login = (req) => {
    //login the user with jwt
    //google login will have already jwt 
    //if using local method then we have to generate the jwt
    
    let loginUser = async () => {
        try {
            let user = await model.User.find({ emailId: req.emailId })
            
            if(user.length == 0) {
                throw ({status:"Error",msg: 'User Not found'})
            }
            
            if (user[0].provider == 'local') {
                let token = jwt.sign({
                    data: { role: user[0].role,
                        firstName:user[0].firstName,
                        lastName: user[0].lastName,
                        emailId: user[0].emailId 
                    }
                }, 'secret', { expiresIn: '1h' });
                let isPasswordCorrect = await this.comparePassword({password: req.password, hash: user[0].password})
                if(isPasswordCorrect) {

                    return { role: user[0].role, lastName: user[0].lastName, emailId: user[0].emailId, token: token };
                
                } else {
                    throw ({ status:"Error",msg:"Password is Wrong"})
                }
               
            } else if (user[0].provider == 'google') {
                if((user[0].password === 'google1234') && req.password) {
                    throw ({ status:"Error",msg:"Please Reset password"})
                }
                let token = jwt.sign({
                    data: { role: user[0].role, firstName:user[0].firstName,lastName: user[0].lastName, emailId: user[0].emailId }
                }, 'secret', { expiresIn: '1h' });
                return { role: user[0].role, lastName: user[0].lastName, firstName:user[0].firstName, emailId: user[0].emailId, token: token };
            }


        } catch (err) {
            if(err instanceof Error) { 
                console.log("Unexpected Error occured",err);
                throw(err)
                //throw(err.message)
            }
            
            throw err;
             //Promise.reject({ status: "Error", msg: 'unexpected Error in login' })
        }

    }

    return loginUser()


}

exports.insertUser = (req) => {
    console.log("insert user data", req);

    let createUser = async () => {

        let hashedPassword = await this.hashPasssword({ password: req.password });
        req.password = hashedPassword;
        await model.User.insertMany(req)

    }
    return createUser()

}


/**
 * @Input { password: 'my-text-password'}
 * @return hash of password 
 */
exports.hashPasssword = (req) => {
    console.log("password is", req.password)
    return bcrypt.hash(req.password, 8).then(function (hash) {
        // Store hash in your password DB.
        console.log('hash password is', hash);
        return hash
    })
        .catch(err => {
            console.log("Error is", err)
        })

}

exports.comparePassword = (req)=>{
    console.log("compare password req is"+JSON.stringify(req))
    return bcrypt.compare(req.password, req.hash).then(function(result) {
       //return false
       console.log("result  of password match is",result);
       return result;
    });  
}





