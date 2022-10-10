import { Router } from "express";
import AuthController from '../controllers/auth.controller'
import { Routes } from "../interface/routes.interface";

export default class AuthRoutes implements Routes{
    public path = "/";
    public router = Router();
    public authController = new AuthController;

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(this.path+"signUp", this.authController.signUp);
        // this.router.post(this.path+"/logIn", this.authController.logIn);
        // this.router.post(this.path+"/logOut", this.authController.logOut);
    }
}
