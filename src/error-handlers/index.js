const app = require('../../app');
const CustErros = require('./handle-error');
const {APIError, Http400Error, AUTHError, EmptyError} = CustErros;
app.use((err,req,res,next)=>{
    if(err instanceof APIError){
    } else if(err instanceof Http400Error){
        return res.status(400).json({"msg":err.message});
    } else if(err instanceof AUTHError){
        return res.status(401).json({"msg":err.message});
    } else if(err instanceof EmptyError ){
        return res.status(204).json({"msg":err.message});
    } else if(err instanceof CustErros.NotFoundError ){
        return res.status(404).json({"msg":err.message});
    } else {
        res.status(500).json({"msg":"Unexpcted Error Occured, Please call customer care."});
    }
})