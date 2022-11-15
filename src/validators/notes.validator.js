import Joi from '@hapi/joi';

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    colour: Joi.string().optional(),
    isArchive: Joi.boolean().optional(),
    isDelete: Joi.boolean().optional(),
    userID: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};