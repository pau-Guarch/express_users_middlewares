import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        user.active=1;
        users.push(user);
        return users.find(element => element.username == user.username);
    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    addGrants(user){
        let userFound = users.find(element => (element.username == user.username))
        userFound.grants= user.grants;
        return userFound;    
    }
    deleteGrants(user, grants){
        let userFound = users.find(element => (element.username == user));
        grants.forEach(element => {
            let index = userFound.grants.indexOf(element);
            if (index !== -1) {
                userFound.grants.splice(index, 1);
            }    
        });
        return userFound;
    }
    updateGrants(req){
        let userFound = users.find(element => (element.username == req.body.username))
        req.body.grants.forEach(element => {
            userFound.grants.push(element);
        });
        return userFound;
    }

    deleteUser(user){
        console.log(user);
        const userfound = users.find(element => (element.username == user.username));
        if(userfound!=undefined){
            userfound.active=0;
        }
        console.log("delete model---------"+userfound)
        return userfound;
    }
    activateUser(user){
        const userfound = users.find(element => (element.username == user.username));
        if(userfound!=undefined){
            userfound.active=1
        }
        return userfound;
    }
    getUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user))
    }
}

export default new User();