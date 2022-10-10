"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
class AdminRoute {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.AdminController = new admin_controller_1.default;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.AdminController.getAdmin);
        this.router.get(this.path + "/:id", this.AdminController.getOneAdmin);
        this.router.post(this.path, this.AdminController.createAdmin);
        this.router.delete(this.path + "/:id", this.AdminController.deleteAdmin);
    }
}
exports.default = AdminRoute;
//# sourceMappingURL=admin.routes.js.map