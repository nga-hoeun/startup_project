"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUser_1 = __importDefault(require("./getUser"));
const createUser_1 = __importDefault(require("./createUser"));
const router = express_1.default.Router();
class User {
    route(router) {
        router.use('/user', (0, getUser_1.default)());
        router.use('/user', (0, createUser_1.default)());
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map