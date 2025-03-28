import { useState, useEffect } from 'react'
const endpoint = 'http://localhost:3000/api/v1/posts';
const imgPath = 'http://localhost:3000/imgs/posts/'




function App() {

  const [postsData, setPosts] = useState([])
  const [deleteSlug, setDeleteSlug] = useState('')

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  let destroy = {
    method: 'DELETE',
  }


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
