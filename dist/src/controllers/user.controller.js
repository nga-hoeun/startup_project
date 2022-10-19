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
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUser();
                res.status(200).json({ "Data": user });
            }
            catch (error) {
                next(error);
            }
        });
        this.getOneUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const oneUser = yield this.userService.getOneUser(userId);
                console.log(oneUser);
                res.status(200).json({ "User": oneUser });
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const deleteUser = yield this.userService.deleteUser(userId);
                console.log(deleteUser);
                res.status(201).json({ "Response": "User Has Been Deleted" });
            }
            catch (err) {
                next(err);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                yield this.userService.updateUser(userId, {
                    email: req.body.email,
                    username: req.body.username,
                    gender: req.body.gender
                });
                res.send("Update Successfuly!");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map