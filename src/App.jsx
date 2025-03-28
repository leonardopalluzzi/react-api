import { useState, useEffect } from 'react'
const endpoint = 'http://localhost:3000/api/v1/posts';
const imgPath = 'http://localhost:3000/imgs/posts/'

import Main from './components/Main'

function App() {

  const [postsData, setPosts] = useState([])
  const [deleteSlug, setDeleteSlug] = useState('')

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

      <Main imgPath={imgPath} endpoint={endpoint} postsData={postsData} handleDelete={handleDelete} />

    </>
  )
}

export default App
