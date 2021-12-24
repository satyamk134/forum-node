const { body, validationResult } = require('express-validator');
const db = require('../../../../models');
User = db.User;
const validRes = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let firstError = {msg:errors.array()[0].msg};
      return res.status(400).json({ errors: errors.array(),...firstError });
    }
    next();
}
exports.validateUser = ()=>{
    return [
        body('emailId').isEmail().withMessage('EmailId Feild is required'),
        body('emailId').custom(async value => {
            try{
                let user = await User.findOne({ where: { emailId:value} });
                if(user){
                    return Promise.reject("Email id already registered!");
                }
            }catch(err){
                return Promise.reject("Not able find Users!");
            }
            
        }),
        body('password').isLength({ min: 5 }),
        body('firstName').not().isEmpty(),
        body('lastName').not().isEmpty(),
        validRes
    ]
}

const validateLoginHandler = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

exports.validateLogin = ()=>{
    return [
        body('emailId').isEmail().withMessage('EmailId Feild is required'),
        body('password').isLength({ min: 5 }).withMessage("Min Length must be 5"),
        validateLoginHandler
    ]
}


