"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const admin_routes_1 = __importDefault(require("./src/routes/admin.routes"));
const app = new app_1.default([new user_routes_1.default(), new admin_routes_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map