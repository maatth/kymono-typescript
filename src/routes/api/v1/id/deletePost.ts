import { Router, Request, Response, NextFunction } from 'express'
import { orm } from '../../../../app'
import PostService from '../../../../services/post'
import { getIdRules, validate } from '../../../../validators/validator'

module.exports = Router({ mergeParams: true }).delete(
  '/v1/posts/:id',
  getIdRules(),
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postService = new PostService()
      await postService.deleteById(parseInt(req.params.id))
      orm.em.flush()
      res.status(205)
      res.json({ message: 'Deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
)
