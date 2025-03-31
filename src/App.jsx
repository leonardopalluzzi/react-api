import { useState, useEffect } from 'react'
const endpoint = 'http://192.168.1.70:3000/api/v1/posts';
const imgPath = 'http://192.168.1.70:3000/imgs/posts/'

import Main from './components/Main'
import Update from './components/Update'

function App() {

  const [postsData, setPosts] = useState([])
  const [deleteSlug, setDeleteSlug] = useState('')
  const [display, setDisplay] = useState(false)
  const [udpateObj, setUpdateObj] = useState({
    title: '',
    content: '',
    image: '',
    tags: []
  })

  let destroy = {
    method: 'DELETE',
  }

  let update = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(udpateObj)
  }

  function handleModify(slug) {
    setDeleteSlug(slug)
    console.log(slug);

    setDisplay(true)
  }

  function handleUpdate(e) {
    const key = e.target.name;
    const value = key == 'tags' ? e.target.value.split(',') : e.target.value;


    setUpdateObj((udpateObj) => ({
      ...udpateObj,
      [key]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(udpateObj);
    fetch(endpoint + '/' + deleteSlug, update)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDisplay(false)
        fetchData(endpoint)

      })
      .catch(err => console.error(err))
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
      <div className={`container ${display === false ? 'd-none' : 'd-block'}`}>
        <Update handleSubmit={handleSubmit} udpateObj={udpateObj} handleUpdate={handleUpdate} />
      </div>


      <Main handleModify={handleModify} imgPath={imgPath} endpoint={endpoint} postsData={postsData} handleDelete={handleDelete} />

    </>
  )
}

export default App
