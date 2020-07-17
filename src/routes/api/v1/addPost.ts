import { Router, Request, Response, NextFunction } from 'express'
import PostService from '../../../services/post'
import { addPostValidationRules, validate } from '../../../validators/validator'
import { orm } from '../../../app'

module.exports = Router({ mergeParams: true }).post(
  '/v1/posts',
  addPostValidationRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postService = new PostService()
      const addedPost = await postService.add(req.body.title, req.body.content)
      orm.em.flush()
      res.status(201)
      res.json(addedPost)
    } catch (error) {
      next(error)
    }
  }
)
