import joi from 'joi'

export const schemaPostUrl=joi.object({
    url:joi.string().uri().required()
})

export const schemaSignUp=joi.object({
    name:joi.string().required(),
    confirmPassword:joi.string().required()
})

export const schemaAuth=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})

export const schemaToken=joi.object({
    authorization:joi.string().required()
})