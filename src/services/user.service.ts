import { User } from '../interface/user.interface';
import UserModel from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import dynamoose from "dynamoose"
import { getDynamoExpression } from '../utils/dynamoose.util';
import { ExpressionAttributeNameMap, ExpressionAttributeValueMap, UpdateItemInput } from 'aws-sdk/clients/dynamodb';
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
const ddb = new dynamoose.aws.sdk.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  // Set DynamoDB instance to the Dynamoose DDB instance
  dynamoose.aws.ddb.set(ddb);
const ddbClient = dynamoose.aws.ddb()

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
                    "id":userId,
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

    public async updateUser(id, user){
        const exp = getDynamoExpression({
            "Payload": {
                email: {
                    $value: user.email
                },
                username:{
                    $value: user.username
                },
                gender:{
                    $value: user.gender
                },
                // score:{
                //     $value:60,
                //     $selfExpression:"#Payload.#score +"
                // },
                // item6: {
                //     $value: 100,
                //     $selfExpression: `#Item.#item6 -`
                // }
            }
        });
        console.log(exp)
        const params:UpdateItemInput = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
              pk:{"S": `USER#${id}`},
              sk: {"S": `USER_AUTH#${id}`},
            },
            ExpressionAttributeNames: exp.ExpressionAttributeNames as ExpressionAttributeNameMap,
            UpdateExpression:exp.UpdateExpression as string,
            ExpressionAttributeValues: exp.ExpressionAttributeValues as ExpressionAttributeValueMap,
          };
          console.log(params)
          try {
            const data = await ddbClient.updateItem(params).promise();
            console.log("Success - item added or updated", data);
            return data;
          } catch (err) {
            console.log("Error", err);
          }
        console.log(id, user)
        // await UserModel.update({pk:`USER#${id}`,sk:`USER_AUTH#${id}`},
        // {
        //     "Payload":{
        //         "email":user.email,
        //         "username":user.username,
        //         "gender":user.gender
        //     }
        // })

    }

    public getOneUser(id: string){
        return UserModel.query("pk").eq(`USER#${id}`).exec();
    }

    public async deleteUser(id:string){
        try {
            await UserModel.delete({pk:`USER#${id}`, sk:`USER_AUTH#${id}`});
            console.log("Successfully deleted item");
        } catch (error) {
            console.error(error);
        }
    }
}

