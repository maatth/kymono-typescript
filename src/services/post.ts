import { orm } from '../app'
import { Post as PostEntity } from '../entities/Post'
import StatuedError from '../utils/StatuedError'

class Post {
  async getById(id: number) {
    const postRepository = await orm.em.getRepository(PostEntity)
    const post = await postRepository.findOne(id)
    if (!post) {
      throw new StatuedError(400, 'Aucun post trouvé pour cet id')
    }

    return post
  }

  async getAll() {
    const postRepository = await orm.em.getRepository(PostEntity)
    return postRepository.findAll()
  }

  async deleteById(id: number) {
    const postRepository = await orm.em.getRepository(PostEntity)
    const post = await postRepository.findOne(id)
    if (!post) {
      throw new StatuedError(400, 'Aucun post trouvé pour cet id')
    }
    postRepository.remove(post)
  }

  async add(title: string, content: string) {
    // Check if post don't exist yet
    const postRepository = await orm.em.getRepository(PostEntity)
    const foundByNamePost = await postRepository.findOne({ title: title })

    if (foundByNamePost) {
      throw new StatuedError(400, 'Le post existe déjà')
    }
    const postModel = new PostEntity(title, content)
    await postRepository.persist(postModel)
    return postModel
  }

  async modify(postId: number, title: string, content: string) {
    let post = await this.getById(postId)
    post.id = postId
    post.title = title
    post.content = content

    return await post
  }
}

export default Post
