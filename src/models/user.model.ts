import * as dynamoose from "dynamoose";
import * as dotenv from "dotenv";
dotenv.config({ path: `env/.env.${process.env.ENV}` });

export const userSchema = new dynamoose.Schema({
  Id: String,
  pk: {
    hashKey: true,
    type: String,
  },
  sk: {
    type: String,
    rangeKey: true,
  },
  Payload: {
    type: Object,
    schema: {
      username: String,
      email: String,
      gender: String,
      password: String,
    },
  },
});

console.log(process.env.AWS_ACCESS_KEY_ID)
const UserModel = dynamoose.model(process.env.DYNAMODB_TABLE, userSchema, {
  throughput: "ON_DEMAND",
  create: false,
  waitForActive: false,
});

export default UserModel;
