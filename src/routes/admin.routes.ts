import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import AdminController from "../controllers/admin.controller";

class AdminRoute implements Routes{
    public path = "/admin";
    public router = Router();
    public AdminController = new AdminController;

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path, this.AdminController.getAdmin);
        this.router.get(this.path+"/:id",this.AdminController.getOneAdmin)
        this.router.post(this.path, this.AdminController.createAdmin);
        this.router.delete(this.path+"/:id", this.AdminController.deleteAdmin);

    }
}

export default AdminRoute