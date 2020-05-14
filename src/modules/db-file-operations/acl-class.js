class Acl {
    name;
    constructor(passedName){
        console.log('My name is satyam');
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