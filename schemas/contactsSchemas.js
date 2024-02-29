import Joi from "joi";

export const createContactSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required()
})

export const updateContactSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string()
})