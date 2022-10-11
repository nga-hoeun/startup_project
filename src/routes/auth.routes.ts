import { Router } from "express";
import AuthController from '../controllers/auth.controller'
import { Routes } from "../interface/routes.interface";
import bodyParser from "body-parser";


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

export default class AuthRoutes implements Routes{
    public path = "/";
    public router = Router();
    public authController = new AuthController;

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(this.path+"signUp", jsonParser, this.authController.signUp);
        this.router.post(this.path+"logIn", jsonParser, this.authController.logIn);
        // this.router.post(this.path+"/logOut", this.authController.logOut);
    }
}
