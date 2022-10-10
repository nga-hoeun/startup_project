import { User } from '../interface/user.interface';
import UserModel from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

export default class UserService{
    public getUser(){
        return UserModel.scan().exec()
    }

    public createUser(user:User){
        const userId = uuidv4()
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // Store hash in your password DB.
                UserModel.create({
                    "Id":userId,
                    "pk":`USER#${userId}`,
                    "sk":`USER_AUTH#${userId}`,
                    "Payload":{
                        "username":user.username,
                        "email":user.email,
                        "gender":user.gender,
                        "password": hash,
                    }
                })
            });
        });
    }

    public getOneUser(id: string){
        return UserModel.query("pk").eq(`USER#${id}`).exec();
    }

    public deleteUser(id:string){
        UserModel.delete(id, (error) => {
            if (error) {
                return (error);
            } else {
                return ("Successfully deleted item");
            }
        });
    }
}

