import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import UserController from "../controllers/user.controller";
import bodyParser from "body-parser";


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

class UserRoute implements Routes{
    public path = "/user";
    public router = Router();
    public UserController = new UserController;

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path, this.UserController.getUser);
        this.router.get(this.path+"/:id",this.UserController.getOneUser)
        this.router.put(this.path+"/:id", jsonParser, this.UserController.updateUser)
        this.router.delete(this.path+"/:id", this.UserController.deleteUser);

    }
}

export default UserRoute