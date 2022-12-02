import { error } from 'winston';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/user.util';
import { sender } from '../utils/rabbitmq';
import { client } from '../config/redis';

//register new user
export const register = async (body) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;
  const data = await User.create(body);
  var userData = JSON.stringify({firstname: data.firstname, lastname: data.lastname, email: data.email});
  sender(userData);
  return data;
};

// user login
export const login = async (body) => {
  await client.del('getAllData');
  const data = await User.findOne({ email: body.email });
  if (data != null) {
    const result = await bcrypt.compare(body.password, data.password);
    if (result) {
      var token = jwt.sign({ firstname: data.firstname, email: data.email }, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Invalid Password");
    }
  }
  else {
    throw new Error("Invalid Email");
  }
};

//forgot password
export const forgotPassword = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data != null) {
    var token = jwt.sign({ firstname: data.firstname, email: data.email }, process.env.SECRET_KEY);
    sendMail(body.email)
    return token;

  } else {
    throw new Error("Invalid Email");
  }
};

//resetpwd
export const resetPassword = async (body) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  const data = await User.findOneAndUpdate({
    email: body.email
    },
    {password: hash},
    {
      new: true
    });
  return data;
};