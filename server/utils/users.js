// [{
//     id:'/#12poddffasf',
//     name:'Andrew',
//     room:'The office Fans'
// }]

class Users{
    constructor(){
        this.users = [];
    }
    
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id){
        var user = this.getUser(id);
        
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return user;
        //return user that was removed
    }
    
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }
    
    getUserList(room){
        var users = this.users.filter((user) => user.room === room );
        var nameArray = users.map((user) => user.name);
        
        return nameArray;
    }
}

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
    
//     getUserDescription(){
//         return `${this.name} is ${this.age} years(s) old`;
//     }
// }

// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);

module.exports = {Users};