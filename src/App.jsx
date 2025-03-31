import { useState, useEffect } from 'react'
const endpoint = 'http://192.168.1.70:3000/api/v1/posts';
const imgPath = 'http://192.168.1.70:3000/imgs/posts/'

import Main from './components/Main'
import Update from './components/Update'

function App() {

  const [postsData, setPosts] = useState([])
  const [deleteSlug, setDeleteSlug] = useState('')
  const [display, setDisplay] = useState(false)
  const [postTitle, setTitle] = useState('')
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

  /**
   * Handles the modification of a post by setting the slug and toggling the display state.
   * @param {string} slug - The unique identifier of the post to be modified.
   */
  function handleModify(slug, title) {
    setDeleteSlug(slug)
    console.log(slug);
    setTitle(title)
    setDisplay(true)
    console.log(postTitle);

  }

  /**
   * Updates the state object for the post being updated based on user input.
   * @param {Event} e - The event object from the input field.
   */
  function handleUpdate(e) {
    const key = e.target.name;
    let value = key == 'tags' ? e.target.value.split(',') : e.target.value;

    if (value == '') {
      value = 'ciao'
    }

    setUpdateObj((udpateObj) => ({
      ...udpateObj,
      [key]: value
    }))
  }

  /**
   * Submits the updated post data to the server and refreshes the posts list.
   * @param {Event} e - The event object from the form submission.
   */
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
      <div className={`overlay ${display === false ? 'd-none' : 'd-block'}`}>
        <Update postTitle={postTitle} setDisplay={setDisplay} handleSubmit={handleSubmit} udpateObj={udpateObj} handleUpdate={handleUpdate} />
      </div>


      <div className={`container ${display === false ? 'd-block' : 'd-none'}`}>
        <Main handleModify={handleModify} imgPath={imgPath} endpoint={endpoint} postsData={postsData} handleDelete={handleDelete} />
      </div>


    </>
  )
}

export default App
