"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const express_1 = __importDefault(require("express"));
const getAdmin_1 = __importDefault(require("./getAdmin"));
const createAdmin_1 = __importDefault(require("./createAdmin"));
const router = express_1.default.Router();
class Admin {
    route(router) {
        router.use('/admin', (0, getAdmin_1.default)());
        router.use('/admin', (0, createAdmin_1.default)());
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map