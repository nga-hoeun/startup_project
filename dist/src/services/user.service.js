"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
class UserService {
    getUser() {
        return user_model_1.default.scan().exec();
    }
    createUser(user) {
        const userId = (0, uuid_1.v4)();
        bcrypt_1.default.genSalt(saltRounds, (err, salt) => {
            bcrypt_1.default.hash(user.password, salt, (err, hash) => {
                // Store hash in your password DB.
                user_model_1.default.create({
                    "Id": userId,
                    "pk": `USER#${userId}`,
                    "sk": `USER_AUTH#${userId}`,
                    "Payload": {
                        "username": user.username,
                        "email": user.email,
                        "gender": user.gender,
                        "password": hash,
                    }
                });
            });
        });
    }
    getOneUser(id) {
        return user_model_1.default.query("pk").eq(`USER#${id}`).exec();
    }
    deleteUser(id) {
        user_model_1.default.delete(id, (error) => {
            if (error) {
                return (error);
            }
            else {
                return ("Successfully deleted item");
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map