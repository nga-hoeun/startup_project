import { Admin } from '../interface/admin.interface';
import { Request, Response } from 'express';
import AdminModel from '../models/admin.model';

const adminInfo = []

class AdminController{
    public getAdmin = (req:Request, res:Response)=>{
        res.status(200).json("You will get all the data when the data is upgraded!")
    }

    public getOneAdmin = (req:Request, res:Response)=>{
        res.status(200).json("The admin with this id "+req.params.id+" has been found!")
    }

    public deleteAdmin = (req:Request, res:Response)=>{
        res.status(201).json("This admin with the id "+req.params.id+" has been deleted!")
    }

    public createAdmin = (req:Request, res:Response)=>{
        const adminRegister = req.body;
        // if(adminInfo.filter(adminRegister) != null){
            res.status(200).json({'email':adminRegister.email, 'password':adminRegister.email})
        // }else{
        //     res.status(500).json("The account has already been created!")
        // }
    }
}

export default AdminController

