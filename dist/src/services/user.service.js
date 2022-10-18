"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_password_1 = __importDefault(require("generate-password"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dynamoose_1 = __importDefault(require("dynamoose"));
const dynamoose_util_1 = require("../utils/dynamoose.util");
const create_util_1 = require("../utils/create.util");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
const ddb = new dynamoose_1.default.aws.sdk.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose_1.default.aws.ddb.set(ddb);
const ddbClient = dynamoose_1.default.aws.ddb();
class UserService {
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.scan().exec();
        });
    }
    createUser(user) {
        const userId = (0, uuid_1.v4)();
        if ((0, create_util_1.isEmpty)(user)) {
            throw new Error("Didn't meet all the required fields");
        }
        else {
            const password = generate_password_1.default.generate({
                length: 8,
                uppercase: true,
                symbols: true,
                numbers: true,
                lowercase: true
            });
            bcrypt_1.default.genSalt(saltRounds, (err, salt) => {
                bcrypt_1.default.hash(password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    user_model_1.default.create({
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
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exp = (0, dynamoose_util_1.getDynamoExpression)({
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
            const params = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    pk: { S: `USER#${id}` },
                    sk: { S: `USER_AUTH#${id}` },
                },
                ExpressionAttributeNames: exp.ExpressionAttributeNames,
                UpdateExpression: exp.UpdateExpression,
                ExpressionAttributeValues: exp.ExpressionAttributeValues,
            };
            console.log(params);
            try {
                const data = yield ddbClient.updateItem(params).promise();
                console.log("Success - item added or updated", data);
                return data;
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = user_model_1.default.query("pk").eq(`USER#${id}`).exec();
            if ((yield userFound).count == 0) {
                throw new Error("User doesn't exist");
            }
            return userFound;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = user_model_1.default.query("pk").eq(`USER#${id}`).exec();
            if ((yield userFound).count == 0) {
                throw new Error("User doesn't exist");
            }
            yield user_model_1.default.delete({ pk: `USER#${id}`, sk: `USER_AUTH#${id}` });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map