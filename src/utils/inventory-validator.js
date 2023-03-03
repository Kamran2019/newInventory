const Joi = require("joi");

const inventoryValidator = (schema) => (payload) => schema.validate(payload);

const inventorySchema = Joi.object({
  DeviceSerialNumber: Joi.string().max(30).trim().required(),
  PurchasePrice: Joi.number().required(),
  ConditionScore: Joi.string()
    .valid("very-good", "good", "needs-maintenance", "needs-replacement")
    .required(),
  PurchaseType: Joi.string().valid("new", "used").required(),
  Type: Joi.string().valid("Laptop", "Phone").required(),
  PurchasedDate: Joi.string().required(),
  Name: Joi.string().max(20).trim().required(),
  Description: Joi.string().trim().max(100).required(),
  PurchasedFrom: Joi.string().trim().max(30).required(),
}).unknown(false);

module.exports = inventoryValidator(inventorySchema);
