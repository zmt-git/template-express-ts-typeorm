import { Response, Request, NextFunction } from 'express'
import UserEntity from '../entity/user'
import { getRepository } from 'typeorm'
import {Token} from "../types/token"
import UserValidate from '../validate/user'
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

      const { error, value } = UserValidate.user.validate(req.body)

      if (error) {
        res.status(400).send(error.message)
      }

      await getRepository(UserEntity)
        .createQueryBuilder('user')
        .update()
        .set(value)
        .execute()

      res.send({code: 1, msg: 'ok'})
    } catch (e) {
      res.status(500).send('数据库异常')
    }
  }
}

export default new UserController()
