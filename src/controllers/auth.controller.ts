import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class AuthController{
    public userService = new UserService;
    public authService = new AuthService;
    public signUp = (req:Request,res:Response)=>{
        this.userService.createUser({
            email:req.body.email,
            username:req.body.username,
            gender:req.body.gender,
            password:req.body.password
        })
        res.send("Add Successfuly!")
    }
    public logIn = (req:Request, res:Response)=>{
        this.authService.logIn(
            req.body.username,
            req.body.password
        )
        res.send("Login Successfully")
    }
}