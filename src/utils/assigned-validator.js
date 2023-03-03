const Joi = require("joi");

const assignedValidator = (schema) => (payload) => schema.validate(payload);

const assignedSchema = Joi.object({
  assignedToName: Joi.string().trim().max(30).required(),
  password: Joi.string().trim().allow("", null),
}).unknown(false);

module.exports = assignedValidator(assignedSchema);
