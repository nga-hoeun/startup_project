import { Request, Response } from "express";
import UserService from "../services/user.service";
import bodyParser from "body-parser";


export default class AuthController{
    public userService = new UserService
    public signUp = (req:Request,res:Response)=>{
        this.userService.createUser({
            email:"ngahoeun33@gmail.com",
            username:"Nga Hoeun",
            gender:"Male",
            password:"12345"
        })
    }
}