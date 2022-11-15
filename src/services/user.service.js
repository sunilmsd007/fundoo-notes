import { error } from 'winston';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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


