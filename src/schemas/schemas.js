import joi from 'joi'

export const schemaPostUrl=joi.object({
    url:joi.string().required()
})

export const schemaSignUp=joi.object({
    name:joi.string().required(),
    confirmPassword:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required()
})

export const schemaLogin=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})
