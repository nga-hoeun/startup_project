import { User } from "../interface/user.interface";
import UserModel from "../models/user.model";
import Generator from "generate-password"
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dynamoose from "dynamoose";
import { getDynamoExpression } from "../utils/dynamoose.util";
import {
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  UpdateItemInput,
} from "aws-sdk/clients/dynamodb";
import { isEmpty } from "../utils/create.util";
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
const ddb = new dynamoose.aws.sdk.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);
const ddbClient = dynamoose.aws.ddb();
export default class UserService {
  static getOneUser: any;
  public async getUser() {
    return UserModel.scan().exec();
  }

  public createUser(user: User) {
    const userId = uuidv4();
    if(isEmpty(user)){
        throw new Error("Didn't meet all the required fields")
    }else{
        const password = Generator.generate({
            length:8,
            uppercase:true,
            symbols:true,
            numbers:true,
            lowercase:true
        })
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            // Store hash in your password DB.
            UserModel.create({
              id: userId,
              pk: `USER#${userId}`,
              sk: `USER_AUTH#${userId}`,
              Payload: {
                username: user.username,
                email: user.email,
                gender: user.gender,
                password: hash,
              },
            });
          });
        });
    }
  }

  public async updateUser(id: string, user: User) {
    const exp = getDynamoExpression({
      Payload: {
        email: {
          $value: user.email,
        },
        username: {
          $value: user.username,
        },
        gender: {
          $value: user.gender,
        },
      },
    });
    console.log(exp);
    const params: UpdateItemInput = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        pk: { S: `USER#${id}` },
        sk: { S: `USER_AUTH#${id}` },
      },
      ExpressionAttributeNames:
        exp.ExpressionAttributeNames as ExpressionAttributeNameMap,
      UpdateExpression: exp.UpdateExpression as string,
      ExpressionAttributeValues:
        exp.ExpressionAttributeValues as ExpressionAttributeValueMap,
    };
    console.log(params);
    try {
      const data = await ddbClient.updateItem(params).promise();
      console.log("Success - item added or updated", data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }

  public async getOneUser(id: string) {
    const userFound = UserModel.query("pk").eq(`USER#${id}`).exec();
    if((await userFound).count == 0){
        throw new Error("User doesn't exist")
    }
    return userFound;
  }

  public async deleteUser(id: string) {
    const userFound = UserModel.query("pk").eq(`USER#${id}`).exec();
    if((await userFound).count == 0){
        throw new Error("User doesn't exist")
    }
    await UserModel.delete({ pk: `USER#${id}`, sk: `USER_AUTH#${id}` });
  }
}
