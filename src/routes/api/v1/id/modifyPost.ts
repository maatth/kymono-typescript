import { Router, Request, Response, NextFunction } from 'express'
import { orm } from '../../../../app'
import PostService from '../../../../services/post'
import {
  modifyPostValidationRules,
  validate,
} from '../../../../validators/validator'

module.exports = Router({ mergeParams: true }).put(
  '/v1/posts/:id',
  modifyPostValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postService = new PostService()
      const modifiedPost = await postService.modify(
        parseInt(req.params.id),
        req.body.title,
        req.body.content
      )
      orm.em.flush()
      res.status(200)
      res.json(modifiedPost)
    } catch (error) {
      next(error)
    }
  }
)
