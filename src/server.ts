import express, { Response, Request, NextFunction, Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path  from 'path'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import chalk from 'chalk'
import figlet from 'figlet'

import jwtAuth from './middlewares/jwtAuth'
import useRouters from './routes'

const log = morgan('dev')

class Server {
  app: Application

  private port = 3000

  constructor() {
    this.app = express()
  }

  async init () {
    try {
      await createConnection()

      this.initializeConfig()

      this.initializeMiddleware()

      this.listen()
    } catch (e) {
      console.log(chalk.red(e))
    }
  }

  // 配置
  initializeConfig () {}

  // 中间件
  initializeMiddleware () {
    // 日志
    this.app.use(log)

    // 跨域
    this.app.use(cors())

    // 解析
    this.app.use(express.json())
    this.app.use(express.urlencoded())

    // 静态目录
    this.app.use(express.static(path.join(__dirname, 'public')))

    // 鉴权
    this.app.use(jwtAuth)

    // 路由
    useRouters(this.app)

    // 404
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send('not found')
    })

    // 500
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token')
        return
      }

      res.status(500)
    })
  }

  // 监听
  listen () {
    this.app.listen(this.port, () => {
      console.log(chalk.blue('服务器启动成功'))
      figlet.textSync('success')
    })
  }
}

const server = new Server()

server.init()

export default server
