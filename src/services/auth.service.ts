import { User } from '../interface/user.interface';
import UserModel from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

export default class AuthService{
    public async logIn(username:string,password:string){
        const user = await UserModel.scan({
            'username':{
                "contains":username
            },
            'password':{
                "contains":password
            }
        }).exec();
        if(user.count == 0){
            console.log("Username or password is incorrect!!")
        }else{
            console.log(user[0]);
        }
    }
}