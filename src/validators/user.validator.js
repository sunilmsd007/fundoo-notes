import Joi from '@hapi/joi';

export const registrationValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
