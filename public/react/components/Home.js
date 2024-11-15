import React from 'react'

function Home (props) {
  return (
    <main>
      <h1>Wikiverse</h1>
      <ul>{props.pages.map((page) => (
        <li key={page.id}>
          <button onClick={() => props.fetchArticle(page.slug)}>
            {page.title}
          </button>
        </li>
      ))}</ul>
      <button onClick={props.showForm}>Add article</button>
    </main>
  )
}

export default Home

