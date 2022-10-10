"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getUser = (req, res) => {
            const user = this.userService.getUser();
            res.status(200).json({ "Data": user });
        };
        this.getOneUser = (req, res) => {
            // res.status(200).json("The user with this id "+req.params.id+"has been found!")
        };
        this.deleteUser = (req, res) => {
            res.status(201).json("This user with the id " + req.params.id + "has been deleted!");
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map