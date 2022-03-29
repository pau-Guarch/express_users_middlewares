import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';
import usersModel from "../models/usersModel.js";

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);
            }
        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, {  message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password)  || result.active==0)
                    next(HttpError(400, { message: messageapp.user_error_login  }));
                else
                    res.status(200).json(result);
                    // next();
            }
        }

    } catch (error) {
        next(error);
    }
};

const addGrants = (req, res, next)=>{
    const user= { username: req.body.username, password: req.body.password, grants: req.body.grants};
    const result = userModel.addGrants(user);
    res.status(200).json(result);
}
const deleteGrants = (req, res, next)=>{
    const user= req.body.username;
    const grants = req.body.grants;
    const result = userModel.deleteGrants(user, grants);
    res.status(200).json(result);
}
const updateGrants = (req, res, next)=>{
    console.log("update grants-------");
    const user = usersModel.updateGrants(req);
    res.status(200).json(user);
}
const deleteUser = (req, res, next)=>{
    const user = { username: req.body.username, password: req.body.password};
    const removedUser = userModel.deleteUser(user);
    console.log("deletuser controller----------"+removedUser);
    res.status(200).json(removedUser);
}

const activateUser = (req, res, next)=>{
    const user = { username: req.body.username, password: req.body.password};
    const activatedUser = userModel.activateUser(user);
    res.status(200).json(activatedUser);
}

const newPass= (req, res, next)=>{
    const body = req.body;

    if (!body.username || !body.password || !body.newpassword) {
        next(HttpError(400, {  message: messageapp.newpassword_not_specified }))
    } else {
        const user = { username: body.username, password: body.password};
        const result = userModel.loginUser(user);
        if (!bcrypt.compareSync(body.password, result.password)  || result.active==0)
                    next(HttpError(400, { message: messageapp.user_error_login  }));
        else{
            result.password= bcrypt.hashSync(body.newpassword, 10);
            res.status(200).json(result);
        }
    }
}

const returnUser = (req, res, next)=>{
    const result = userModel.getUser(req.params.username);
    const userFound = JSON.parse(JSON.stringify(result));
    if (userFound==undefined){
        next(HttpError(400, { message: "user not found" }));
    }else{
        delete userFound.password;
        res.status(200).json(userFound);
    }

}



export default {
    register,
    login,
    addGrants,
    deleteUser,
    activateUser,
    newPass,
    returnUser,
    deleteGrants,
    updateGrants
}