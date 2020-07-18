import axios from 'axios'
import { Post } from '../interfaces/Post'

function findAll() {
  return axios.get('/api/v1/posts')
}

function deletePost(id: number) {
  return axios.delete('/api/v1/posts/' + id)
}

function add(post: Post) {
  return axios.post('/api/v1/posts/' + post.id, post)
}

function getbyId(id: number) {
  return axios.get('/api/v1/posts/' + id)
}

function put(post: Post) {
  return axios.put('/api/v1/posts/' + post.id, post)
}

export default {
  findAll,
  delete: deletePost,
  add,
  getbyId,
  put,
}
