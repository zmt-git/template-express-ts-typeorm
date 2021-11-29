import expressJWT from 'express-jwt'

export default expressJWT({ secret: 'express-ts-typeorm', algorithms: ['HS256']}).unless({
  path: [
    '/system/login'
  ]
})
