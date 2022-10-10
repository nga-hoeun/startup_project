"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = 4000;
        this.initializeRoutes(routes);
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use("/", route.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('This app runs on port' + this.port);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map