import { useState, useEffect } from 'react'
const endpoint = 'http://localhost:3000/api/v1/posts';
const imgPath = 'http://localhost:3000/imgs/posts/'

function App() {

  const [postsData, setPosts] = useState([])
  const [deleteSlug, setDeleteSlug] = useState('')

  /**
   * Truncates a given text to a specified maximum length and appends "..." if truncated.
   * @param {string} text - The text to be truncated.
   * @param {number} maxLength - The maximum allowed length of the text.
   * @returns {string} - The truncated text.
   */
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  let destroy = {
    method: 'DELETE',
  }

  /**
   * Sends a DELETE request to the specified URL with the given slug and updates the posts data.
   * @param {string} url - The base URL for the API endpoint.
   * @param {string} slug - The unique identifier of the post to be deleted.
   */
  function handleDelete(url, slug) {
    setDeleteSlug(slug)
    console.log(slug);

    fetch(url + "/" + slug, destroy)
      .then(data => {
        console.log('Deleted:', data);
        fetchData(endpoint)
      })
      .catch(error => console.error(error))
  }

  /**
   * Fetches data from the specified URL and updates the posts state.
   * @param {string} url - The API endpoint to fetch data from.
   */
  function fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchData(endpoint)
  }, [])

  return (
    <>

      <header>
        <div className="container">
          <h1>Posts</h1>
        </div>
      </header>

      <main>
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
                  <td>Operations</td>
                </tr>
              </thead>
              <tbody>

                {postsData.map(post => (

                  <tr key={post.slug} className="">
                    <td scope="row">{post.title}</td>
                    <td>{post.slug}</td>
                    <td>{truncateText(post.content, 50)}</td>
                    <td>
                      <img className='post_img' src={imgPath + post.image} alt="" /></td>
                    <td>{post.tags}</td>
                    <td>
                      <button onClick={() => handleDelete(endpoint, post.slug)} className='btn btn-danger'>Delete</button>
                    </td>
                  </tr>


                ))}




              </tbody>
            </table>
          </div>
        </div>
      </main>




    </>
  )
}

export default App
