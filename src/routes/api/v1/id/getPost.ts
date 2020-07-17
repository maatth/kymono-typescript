import { Router, Request, Response, NextFunction } from 'express'
import { getIdRules, validate } from '../../../../validators/validator'
import PostService from '../../../../services/post'

module.exports = Router({ mergeParams: true }).get(
  '/v1/posts/:id',
  getIdRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postService = new PostService()
      const post = await postService.getById(parseInt(req.params.id))
      res.status(200).json(post)
    } catch (error) {
      next(error)
    }
  }
)
