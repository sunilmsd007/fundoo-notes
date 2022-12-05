import Joi from '@hapi/joi';

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    colour: Joi.string().optional(),
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

export const notesUpdateValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2),
    description: Joi.string().min(2),
    colour: Joi.string().optional(),
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

//collaborator
export const collaboratorValidator = (req, res, next) => {
  const schema = Joi.object({
    collaborator: Joi.string().email()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
     req.validatedBody = value;
    next();
  }
};