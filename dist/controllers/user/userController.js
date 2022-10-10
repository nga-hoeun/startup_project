"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() {
        this.user = [
            {
                username: "Eddie",
                password: "Nathan"
            }
        ];
        this.getUser = (request, response) => {
            response.send(this.user);
        };
        this.createUser = (request, response) => {
            const post = request.body;
            this.user.push(post);
            response.send(post);
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map