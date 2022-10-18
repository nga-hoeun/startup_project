import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import UserController from "../controllers/user.controller";
import bodyParser from "body-parser";
import authMiddleware from "../middleware/auth.middleware";


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
        this.router.get(this.path, authMiddleware, this.UserController.getUser);
        this.router.get(this.path+"/:id",authMiddleware, this.UserController.getOneUser)
        this.router.put(this.path+"/:id",authMiddleware, jsonParser, this.UserController.updateUser)
        this.router.delete(this.path+"/:id",authMiddleware, this.UserController.deleteUser);

    }
}

export default UserRoute