const AWS = require("aws-sdk");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { error } = require("winston");
const AppError = require("../util/error/app-error");
const { StatusCodes } = require("http-status-codes");
AWS.config.update({ region: process.env.AWS_REGION });

const cognito = new AWS.CognitoIdentityServiceProvider();

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const registerUser = async ({ email, name, password }) => {
  // const hashedPassword = await bcrypt.hash(password, 10);

  const params = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: name },
    ],
    MessageAction: "SUPPRESS",
  };
  try {
    await cognito.adminCreateUser(params).promise();
    await cognito
      .adminSetUserPassword({
        UserPoolId: USER_POOL_ID,
        Username: email,
        Password: password,
        Permanent: true, // ✅ Makes password permanent
      })
      .promise();

    return {
      message: "Successfully regstered the user.Please confirm your email",
    };
  } catch (error) {
    console.error("Regiteration error", error);
    throw new AppError(
      "Couldnt register the user ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const loginUser = async ({ email, password }) => {
  const ttl = Math.floor(Date.now() / 1000) + 3600;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    // 🔹 Authenticate user with Cognito
    const response = await cognito.initiateAuth(params).promise();
    const token = response.AuthenticationResult.IdToken;

    // 🔹 Store session in DynamoDB with a TTL of 1 hour (3600 seconds)
    await DynamoDB.put({
      TableName: "UserSessions", // ✅ Use the new table name
      Item: {
        email, // ✅ Partition Key
        sessionId: new Date().getTime().toString(), // ✅ Sort Key
        token, // ✅ Store token separately
        expiresAt: ttl, // ✅ TTL (auto-delete)
      },
    }).promise();

    console.log(`✅ Session stored in DynamoDB for ${email}`);

    return response;
  } catch (err) {
    console.log("there was some error", err);
    throw new AppError(
      "Invalid username or password",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  registerUser,
  loginUser,
};
