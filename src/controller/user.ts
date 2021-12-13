import { Response, Request, NextFunction } from 'express'
import UserEntity from '../entity/user'
import { getRepository } from 'typeorm'
import {Token} from "../types/token"
import { validate } from "class-validator"

class UserController {
  async getInfo (req: Request, res: Response, next: NextFunction) {
    try {

      const user = req.user as Token

      const result = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.id = :id', { id: user.id })
        .getOne()

      res.send(result)
    } catch (e) {
      res.status(500).send('数据库异常')
    }
  }

  async save (req: Request, res: Response, next: NextFunction) {
    try {

      let user = new UserEntity()

      user = Object.assign(user, req.body)

      const errors = await validate(user)

      if (errors.length > 0) {
        res.sendStatus(400).send({ msg: errors[0].contexts })
        console.log(errors)
        return
      }

      const userRepository = getRepository(UserEntity)

      await userRepository.save(user)

      res.send({code: 1, msg: 'ok'})
    } catch (e) {
      res.status(500).send('数据库异常')
    }
  }
}

export default new UserController()
