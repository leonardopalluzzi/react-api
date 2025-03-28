import { useState, useEffect } from 'react'
const endpoint = 'http://localhost:3000/api/v1/posts'


function App() {

  const [posts, setPosts] = useState([])


  function fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data)
      })
  }

  useEffect(() => {
    fetchData(endpoint)
  }, [])

  return (
    <>
      <div className="container">
        <div
          className="table-responsive"
        >
          <table
            className="table table-primary"
          >
            <thead>
              <tr className="">
                <td scope="row">Title</td>
                <td>Slug</td>
                <td>Content</td>
                <td>IMG</td>
                <td>TAGS</td>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => {
                <tr key={post.slug} className="">
                  <td scope="row">{post.title}</td>
                  <td>{post.slug}</td>
                  <td>{post.content}</td>
                  <td>{post.image}</td>
                  <td>{post.tags}</td>
                </tr>
              })}


            </tbody>
          </table>
        </div>
      </div>



    </>
  )
}

export default App
