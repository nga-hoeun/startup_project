import express from "express";
import { Routes } from "./src/interface/routes.interface";
import * as dotenv from "dotenv";
import * as dynamoose from "dynamoose";
import cookieParser from "cookie-parser"
class App {
  public app: express.Application;
  public port: number;

  constructor(routes: Routes[]) {
    dotenv.config({ path: `env/.env.${process.env.ENV}` });
    this.app = express();
    this.port = 4000;
    this.initializeRoutes(routes);
    this.initializeMiddlewares();
    this.initDynamoose();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddlewares() {
    // this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("This app runs on port" + this.port);
    });
  }

  public initDynamoose() {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.sdk.DynamoDB({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
  }
}
export default App;
