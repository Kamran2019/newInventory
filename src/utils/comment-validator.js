const Joi = require("joi");

const commentValidator = (schema) => (payload) => schema.validate(payload);

const commentSchema = Joi.object({
  comment: Joi.string().trim().max(50).required(),
}).unknown(false);

module.exports = commentValidator(commentSchema);
