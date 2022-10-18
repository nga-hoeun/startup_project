import { User } from '../interface/user.interface';
import UserModel from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { DataStoredInToken, TokenData } from '../interface/auth.interface';
import { AnyDocument } from 'dynamoose/dist/Document';
import { HttpException } from '../utils/error.utils';


export default class AuthService{
    public async logIn(email:string,password:string){
        console.log(email)
        const userToFind = await UserModel.scan("Payload.email").eq(email).exec();
        const userInfo = userToFind[0].toJSON().Payload;
        console.log(userInfo)
        const match = await bcrypt.compare(password, userInfo.password);
        console.log(match)
        if(match){
            const tokenData = this.createToken(userToFind[0]);
            const cookie = this.createCookie(tokenData);
            return {userInfo,cookie}
        }else{
            throw new HttpException(401,"Unsucessful login!!")
        }
    }
    public createToken(user: AnyDocument): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user.id };
        const secretKey: string = process.env.AWS_ACCESS_KEY_ID;
        const expiresIn: number = 60 * 60;
        
        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }
    
    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
    
        // public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
        //     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
        
        //     const findUser: User = this.users.find(user => user.email === userData.email);
        //     if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);
        
        //     const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        //     if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
        
    
        
        //     return { cookie, findUser };
        //   }
}