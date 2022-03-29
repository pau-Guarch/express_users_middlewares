import HttpError from "http-errors";
import messageapp from '../data/messages.js'

// regular expressions: https://regex101.com/
const validatePassword = (req, res, next) => {
    const body = req.body;

    if (body.password) {
        if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(body.password)) {
            next();
        } else {
            const user_invalid_format = "Password error format";
            next(HttpError(400, { message: user_invalid_format }))
        }

    }
}

export default {
    validatePassword
};