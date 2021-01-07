const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
//in order to create schema

const productSchema = 
  mongoose.Schema({
      code:Number,
      size:String,
      price:Number,
      image:String,
}); 
const ProductModel = mongoose.model("p2",productSchema);//model name 
//then, schema name


//@hapi/joi use here
function validateProduct(data) {
    const schema = Joi.object({
      code: Joi.number().min(0).required(),
      price: Joi.number().min(0).required(),
      size: Joi.string().min(1).max(10).required(),
      image: Joi.string().required(),
    });
    return schema.validate(data, { abortEarly: false });
  }
  module.exports.ProductModel = ProductModel;
  module.exports.validate = validateProduct;
//module.exports = ProductModel;  