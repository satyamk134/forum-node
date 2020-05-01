exports.getHelloWorld = (req, res)=>{
    console.log("came to get hello world")
    res.json({status:"sucess",msg:"Hello World"})
}