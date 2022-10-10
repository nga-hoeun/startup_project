"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    constructor() {
        this.allUsers = user_model_1.default;
    }
    getUser() {
        return {
            "name": "Test"
        };
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map