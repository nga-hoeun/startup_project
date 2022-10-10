"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminInfo = [];
class AdminController {
    constructor() {
        this.getAdmin = (req, res) => {
            res.status(200).json("You will get all the data when the data is upgraded!");
        };
        this.getOneAdmin = (req, res) => {
            res.status(200).json("The admin with this id " + req.params.id + " has been found!");
        };
        this.deleteAdmin = (req, res) => {
            res.status(201).json("This admin with the id " + req.params.id + " has been deleted!");
        };
        this.createAdmin = (req, res) => {
            const adminRegister = req.body;
            // if(adminInfo.filter(adminRegister) != null){
            res.status(200).json({ 'email': adminRegister.email, 'password': adminRegister.email });
            // }else{
            //     res.status(500).json("The account has already been created!")
            // }
        };
    }
}
exports.default = AdminController;
//# sourceMappingURL=admin.controller.js.map