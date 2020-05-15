class Acl {
    name;
    constructor(passedName){
        
        this.name = passedName 
    }

    printName = () => {
        console.log("print function My name is",this.name);
        return '0';
    }

}

module.exports = {
    Acl
}