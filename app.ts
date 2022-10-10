import express from "express";
import { Routes } from "./src/interface/routes.interface";
class App{
    public app: express.Application;
    public port: number;

    constructor(routes:Routes[]){
        this.app = express();
        this.port = 4000;
        this.initializeRoutes(routes)

    }

    private initializeRoutes(routes:Routes[]){
        routes.forEach(route => {
            this.app.use("/",route.router)
        });
    }

    public listen(){
        this.app.listen(this.port,()=>{
            console.log('This app runs on port' + this.port)
        })
    }
}
export default App;