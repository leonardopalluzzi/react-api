import { useState, useEffect } from 'react'
const endpoint = 'http://localhost:3000/api/v1/posts'


function App() {


  function fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

      })
  }

  useEffect(() => {
    fetchData(endpoint)
  }, [])


  return (
    <>

    </>
  )
}

export default App
