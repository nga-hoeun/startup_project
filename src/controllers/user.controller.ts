import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController{
    private userService = new UserService()
    public getUser = async (req:Request, res:Response)=>{
        const user = await this.userService.getUser()
        console.log(user)
        res.status(200).json({"Data":user})
    }



    public getOneUser  = async (req:Request, res:Response)=>{
        console.log("ID", req.params.id)
        const oneUser = await this.userService.getOneUser(req.params.id);
        console.log(oneUser)
        res.status(200).json({"User":oneUser})
        // res.status(200).json("The user with this id "+req.params.id+"has been found!")
        
    }

    public deleteUser = (req:Request, res:Response)=>{
        console.log("ID", req.params.id)
        const deleteUser = this.userService.deleteUser(req.params.id);
        res.status(201).json({"Response":deleteUser})
    }
}

export default UserController