import { Router, Request, Response, NextFunction } from 'express'
import PostService from '../../../services/post'

module.exports = Router({ mergeParams: true }).get(
  '/v1/posts',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postService = new PostService()
      const posts = await postService.getAll()
      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  }
)
