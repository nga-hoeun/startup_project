"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var jsonParser = body_parser_1.default.json();
var urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
class UserRoute {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.UserController = new user_controller_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, this.UserController.getUser);
        this.router.get(this.path + "/:id", auth_middleware_1.default, this.UserController.getOneUser);
        this.router.put(this.path + "/:id", auth_middleware_1.default, jsonParser, this.UserController.updateUser);
        this.router.delete(this.path + "/:id", auth_middleware_1.default, this.UserController.deleteUser);
    }
}
exports.default = UserRoute;
//# sourceMappingURL=user.routes.js.map