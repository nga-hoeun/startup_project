"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
class UserRoute {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.UserController = new user_controller_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.UserController.getUser);
        this.router.get(this.path + "/:id", this.UserController.getOneUser);
        // this.router.post(this.path, this.UserController.createUser);
        this.router.delete(this.path + "/:id", this.UserController.deleteUser);
    }
}
exports.default = UserRoute;
//# sourceMappingURL=user.routes.js.map