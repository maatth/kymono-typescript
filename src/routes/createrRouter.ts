import glob from 'glob'
import ExpressRouter from 'express'
import { RequestHandler, Application } from 'express'

//add every router in this folder to the rootRouter
export default () =>
  glob
    .sync('**/*.js', { cwd: `${__dirname}/` })
    .map((filename: string) => require(`./${filename}`))
    .filter(
      (router: RequestHandler) =>
        Object.getPrototypeOf(router) == ExpressRouter.Router
    )
    .reduce(
      (rootRouter: Application, router: RequestHandler) =>
        rootRouter.use(router),
      ExpressRouter.Router({ mergeParams: true })
    )
