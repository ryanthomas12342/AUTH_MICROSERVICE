const { StatusCodes } = require("http-status-codes");

const { AuthService } = require("../services");
const { SuccessMessage, ErrorMessage } = require("../util/common");
const AppError = require("../util/error/app-error");

const CLIENT_ID = process.eventNames.COGNITO_CLIENT_ID;

const registerUser = async (req, res) => {
  try {
    const resp = await AuthService.registerUser(req.body);
    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).send(SuccessMessage);
  } catch (err) {
    console.log(err);
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    return res.status(err.statusCode).json(ErrorMessage);
  }
};

const loginUser = async (req, res) => {
  try {
    const resp = await AuthService.loginUser(req.body);
    SuccessMessage.data = resp;

    return res.status(StatusCodes.OK).send(SuccessMessage);
  } catch (err) {
    console.log(err);
    ErrorMessage.error = new AppError(err.explanation, err.statusCode);
    return res.status(err.statusCode).json(ErrorMessage);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
