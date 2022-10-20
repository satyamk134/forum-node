const { body, validationResult } = require('express-validator');

const validAddress = ()=>{
    let validateAddress = (req,res,next)=>{
        const errors = validationResult(req);
        console.log("came for validate result",errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }

    return [
        body('firstName').exists().withMessage('First Name is required'),
        body('lastName').exists().withMessage('Last Name is required'),
        body('mobileNumber').exists().withMessage('Mobile Number is required'),
        body('address').exists().withMessage('address is required'),
        body('city').exists().withMessage('City is required'),
        body('pincode').exists().withMessage('Pincode is required'),
        validateAddress
    ]
    
}
const validDeleteReq = ()=>{

    let validateAddress = (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        return next();
    }

    return [
        body('id').exists().withMessage('Address Id is required'),
        validateAddress
    ]

}

module.exports = {
    validAddress,
    validDeleteReq
}