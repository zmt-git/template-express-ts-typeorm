import Joi from 'joi'

export default class UserValidate {
  static user = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    account: Joi.string().required()
  })
}
