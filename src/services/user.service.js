import { error } from 'winston';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

//register new user
export const register = async (body) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);
  body.password = hash;
  const data = await User.create(body);
  return data;
};

// user login
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data != null) {
    if (body.password == data.password) {
      return data;
    }
    else {
      throw new Error("Invalid Password");
    }
  }
  else {
    throw new Error("Invalid Email");
  }
};


