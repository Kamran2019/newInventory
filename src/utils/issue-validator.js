const Joi = require("joi");

const issueValidator = (schema) => (payload) => schema.validate(payload);

const issueSchema = Joi.object({
  issue: Joi.string().max(50).trim().required(),
}).unknown(false);

module.exports = issueValidator(issueSchema);
