import React, { useState, useEffect } from 'react'
import PostAPI from '../services/PostAPI'
import { Post } from '../interfaces/Post'

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [search, setSearch] = useState<string>('')

  const fetchPosts = async () => {
    try {
      const response = await PostAPI.findAll()
      setPosts(response.data)
      setFilteredPosts(response.data)
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget
    setSearch(value)

    const result = posts.filter((post) => {
      return post.title.includes(value) || post.content.includes(value)
    })

    setFilteredPosts(result)
  }

  return (
    <>
      <h1>Ts technical test</h1>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Search
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Type your search here"
          value={search}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <h2>{String(posts.length) + ' posts'}</h2>
      {filteredPosts.map((post) => (
        <div key={post.id} className="card text-white bg-primary mb-3">
          <div className="card-header">{'Post #' + post.id}</div>
          <div className="card-body">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default PostsPage
