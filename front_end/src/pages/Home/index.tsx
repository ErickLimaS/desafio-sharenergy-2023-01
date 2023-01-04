import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api/randomUserGenerator'
import User from '../../Components/Home/User'
import Styles from './Home.module.css'
import Loading from '../../img/icons/Loading200Px'
import Search from '../../img/icons/Search'
import Plus from '../../img/icons/Plus'

interface UserTypes {

  email: string,
  picture: {
    medium: string,
    thumbnail: string
  },
  name: {
    title: string,
    first: string,
    last: string
  },
  login: {
    username: string,
    sha256: string
  },
  dob: {
    age: number
  }

}

function Home() {

  const [users, setUsers] = useState<any>()
  const [searchResults, setSearchResults] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [increaseResultsOnPage, setIncreaseResultsOnPage] = useState<number>(1)

  // fetch other users info to be displayed on home page
  async function fetchUsersOnHomePage(pagination: number) {

    setLoading(true)
    const res: any = await getUsers(pagination)

    if (!users) {

      setUsers(res)

      setLoading(false)

      return

    }

    res.forEach((item: UserTypes) => {
      setUsers((curr: any) => [...curr, item])
    })

    setLoading(false)

    return

  }

  // handles search input
  async function handleSearchForm(e: React.FormEvent) {

    e.preventDefault()


    // gets results for the content searched
    const res = await getUsers(increaseResultsOnPage)

    console.log(res)

    setSearchResults(res)

    setLoading(false)

  }

  useEffect(() => {

    fetchUsersOnHomePage(increaseResultsOnPage)

  }, [increaseResultsOnPage])

  return (
    <div className={Styles.container}>
      <h1>Início</h1>

      {/* <p>Após o Login, a página principal deve conter uma listagem de usuários gerada a partir da api Random User Generator, a lista deve conter a foto do usuário, nome completo, email, username e idade. Além disso, os requests devem ser páginados, porém, é de critério do participante do desafio a quantidade de resultados a serem exibidos por página e variações para o mesmo. Também, deve haver uma search para buscar usuários por nome, email ou username;</p> */}

      <form
        onSubmit={(e) => handleSearchForm(e)}
        id={Styles.form_search}
      >
        <input type='text'
          id='search' name='search'
          placeholder='Pesquisar por...'
        ></input>
        <button type='submit' title='Procurar Usuário'>
          <Search alt='Lupa' />
        </button>
      </form>

      <div className={Styles.users_container}>
        <h2>Usuários</h2>

        {users && (
          <ul>
            {users.map((item: UserTypes) => (
              <User key={item.login.sha256} props={item} />
            ))}
          </ul>
        )}

        <div className={Styles.button_container}>

          <button onClick={() => setIncreaseResultsOnPage((curr) => curr + 1)}>
            <Plus />
            Ver mais usuários
          </button>

          {loading && (
            <Loading />
          )}

        </div>

      </div>

    </div>
  )
}

export default Home