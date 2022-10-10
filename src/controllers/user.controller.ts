import { User } from '../interface/user.interface';
import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController{
    private userService = new UserService()
    public getUser = (req:Request, res:Response)=>{
        const user = this.userService.getUser()
        res.status(200).json({"Data":user})
    }

    public getOneUser = (req:Request, res:Response)=>{
        // res.status(200).json("The user with this id "+req.params.id+"has been found!")
        
    }

    public deleteUser = (req:Request, res:Response)=>{
        res.status(201).json("This user with the id "+req.params.id+"has been deleted!")
    }
}

export default UserController