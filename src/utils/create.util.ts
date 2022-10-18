import { User } from "../interface/user.interface";

 export const isEmpty = (user:User): boolean => {
    if(user.email == null 
    || user.gender == null
    || user.username == null){
        return true
    }else{
        return false
    }
  };
  