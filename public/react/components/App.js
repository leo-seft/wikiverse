import React, { useEffect, useState } from 'react'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

import Home from './Home'
import Page from './Page'

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [isAddingArticle, setIsAddingArticle] = useState(false)

const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [tags, setTags] = useState('')

 
  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  async function fetchArticle (slug) {
    const response = await fetch(`${apiURL}/wiki/${slug}`)
    const articleData = await response.json()
    setCurrentPage(articleData)
  }

  async function goHome () {
    await fetchPages()
    setCurrentPage(null)
  }

  function showForm(){
    setIsAddingArticle(true)
  }

  function hideForm(){
    setIsAddingArticle(false)
  }

  async function createPage(event){
    event.preventDefault()
    const res = await fetch(`${apiURL}/wiki`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
        name,
        email,
        tags
      })
    })

    if (res.ok){
      await fetchPages()
      hideForm()
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  if(isAddingArticle){
    return(
      <>
      <form onSubmit={createPage}>
        <button onClick={hideForm}>Go back</button>
        <p>
          <label htmlFor='title'>Title</label>
          <input 
          type='text' 
          id ='title' 
          value={title} 
          onChange={(event) => setTitle(event.target.value)}/>
        </p>
        <p><label htmlFor='content'>Content</label>
          <textarea 
          id ='content' 
          value={content} 
          onChange={(event) => setContent(event.target.value)}/></p>
        <p><label htmlFor='name'>Name</label>
          <input 
          type='text' 
          id ='name' 
          value={name} 
          onChange={(event) => setName(event.target.value)}/></p>
        <p><label htmlFor='email'>Email</label>
          <input 
          type='email' 
          id ='email' 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}/></p>
        <p><label htmlFor='tags'>Tags</label>
          <input 
          type='text' 
          id ='tags' 
          value={tags} 
          onChange={(event) => setTags(event.target.value)}/></p>
        <p><button>Submit</button></p>
      </form>
      </>
    )
  }

  if (!currentPage) {
    return <Home pages={pages} fetchArticle={fetchArticle} showForm={showForm} />
  }

  return <Page {...currentPage} goHome={goHome} />
}