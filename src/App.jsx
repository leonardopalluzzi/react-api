import { useState, useEffect } from 'react'
const enpoint = 'http://192.168.1.70:3000/api/v1/posts'


function App() {


  function fetchData(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);

      })
  }

  useEffect(() => {
    fetchData(enpoint)
  }, [])


  return (
    <>

    </>
  )
}

export default App
