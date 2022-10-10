import UserModel from '../models/user.model';


export default class UserService{
    public allUsers = UserModel;

    public getUser(){
        return {
            "name":"Test"
        }
    }
}

