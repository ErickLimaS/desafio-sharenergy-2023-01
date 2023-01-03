import React, { useState } from 'react'
import { getUsers } from '../../api/randomUserGenerator'

function Home() {

  const [searchResults, setSearchResults] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSearchForm(e: React.FormEvent) {

    e.preventDefault()

    setLoading(true)

    // gets results for the content searched
    const res = await getUsers()

    console.log(res)

    setSearchResults(res)

    setLoading(false)

  }

  return (
    <>
      <h1>Home</h1>
      <p>Após o Login, a página principal deve conter uma listagem de usuários gerada a partir da api Random User Generator, a lista deve conter a foto do usuário, nome completo, email, username e idade. Além disso, os requests devem ser páginados, porém, é de critério do participante do desafio a quantidade de resultados a serem exibidos por página e variações para o mesmo. Também, deve haver uma search para buscar usuários por nome, email ou username;</p>

      <form
        onSubmit={(e) => handleSearchForm(e)}
        id='form_search'
      >
        <input type='text'
          id='search' name='search'
          placeholder='Pesquisar por...'
        ></input>
        <button type='submit'>Proc</button>
      </form>

      {searchResults && (
        <ul>
          {searchResults.map((item: any) => (
            <li key={item.login.sha256}>{item.name.title}</li>
          ))}
        </ul>
      )}

    </>
  )
}

export default Home