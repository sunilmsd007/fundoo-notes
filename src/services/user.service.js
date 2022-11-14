import { error } from 'winston';
import User from '../models/user.model';

//register new user
export const register = async (body) => {
const data = await User.create(body);
return data;
};
 


