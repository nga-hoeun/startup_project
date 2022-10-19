import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController{
    private userService = new UserService()
    public getUser = async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const user = await this.userService.getUser()
            res.status(200).json({"Data":user})
        }catch(error){
            next(error)
        }
    }
    public getOneUser  = async (req:Request, res:Response, next: NextFunction)=>{
        const userId = req.params.id
        try{
            const oneUser = await this.userService.getOneUser(userId);
            console.log(oneUser)
            res.status(200).json({"User":oneUser})
        }catch(err) {
            next(err)
        }        
    }

    public deleteUser = async (req:Request, res:Response, next:NextFunction)=>{
        const userId = req.params.id
        try{
            const deleteUser = await this.userService.deleteUser(userId);
            console.log(deleteUser)
            res.status(201).json({"Response":"User Has Been Deleted"})
        }catch(err){
            next(err)
        }
    }

    public updateUser = async (req:Request, res:Response, next:NextFunction)=>{
        const userId = req.params.id
        try{
            await this.userService.updateUser(
                userId,
                {
                    email:req.body.email,
                    username:req.body.username,
                    gender:req.body.gender
                }
            )
            res.send("Update Successfuly!")
        }catch(error){
            next(error)
        }
    }
}

export default UserController