"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser();
            console.log(user);
            res.status(200).json({ "Data": user });
        });
        this.getOneUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("ID", req.params.id);
            const oneUser = yield this.userService.getOneUser(req.params.id);
            console.log(oneUser);
            res.status(200).json({ "User": oneUser });
            // res.status(200).json("The user with this id "+req.params.id+"has been found!")
        });
        this.deleteUser = (req, res) => {
            console.log("ID", req.params.id);
            const deleteUser = this.userService.deleteUser(req.params.id);
            res.status(201).json({ "Response": deleteUser });
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map