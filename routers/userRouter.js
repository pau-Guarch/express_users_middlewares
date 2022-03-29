import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middleware/authHandler.js'
import userHandler from '../middleware/userHandler.js';
import userPassword from '../middleware/passwordHandler.js'


const router = Router();

router.use((req, res, next) => {
    console.log('---> userRouter.js');
    next();
});

//middleware get
router.use(userHandler.validateUserEmail);

const addTimestamp = (req, res, next) => {
    console.log('---> userRouter:addTimestamp');
    req.body.timestamp = new Date();
    next();
}

router.route('/:username')
    .get(userController.returnUser);

router.route('/newpass')
    .put(userController.newPass);

router.route('/user')
    .put(userController.activateUser);

router.route('/grants')
    .put(userController.updateGrants)
    .delete(userController.deleteGrants)
    .post(userController.addGrants);

router.route('*')
    .delete(userController.deleteUser);

router.route('/register')
    .post(userPassword.validatePassword)
    .post(authHandler.encryptPassword)
    .post(addTimestamp)
    .post(userController.register);

router.route('/login')
    .post(userController.login);

export default router;