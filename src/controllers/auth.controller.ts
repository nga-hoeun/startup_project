import { NextFunction, Request, Response } from "express";
import { User } from "../interface/user.interface";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class AuthController {
  public userService = new UserService();
  public authService = new AuthService();
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.createUser({
        email: req.body.email,
        username: req.body.username,
        gender: req.body.gender,
      });
      res.status(201).json({ Response: "User Created Successfully" });
    } catch (error) {
      next(error);
    }
  };
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userInfo, cookie } = await this.authService.logIn(
        req.body.email,
        req.body.password
      );
      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: userInfo, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logOutUserData = await this.authService.logOut();

      // res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {}
  };
}
