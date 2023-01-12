import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api/randomUserGenerator'
import User from '../../Components/Home/User'
import Styles from './Home.module.css'
import Loading from '../../img/icons/Loading200Px'
import Search from '../../img/icons/Search'
import Plus from '../../img/icons/Plus'
import UserSearchResult from '../../Components/Home/UserSearchResult'

function Home() {

  const [users, setUsers] = useState<UserGenTypes[]>([])
  const [searchResults, setSearchResults] = useState<UserGenTypes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const searchInput = React.useRef<HTMLInputElement>(null)

  const [paginationForMoreResults, setPaginationForMoreResults] = useState<number>(1)

  // fetch other users info to be displayed on home page
  async function fetchUsersOnHomePage(pagination: number) {

    setLoading(true)
    const res: Partial<UserGenTypes> = await getUsers(pagination)

    if (!users) {

      setUsers(res as any)
      setSearchResults(res as any)

      setLoading(false)

      return

    }

    (res as UserGenTypes[]).forEach((item: UserGenTypes) => {
      setUsers((curr: UserGenTypes[]) => [...curr, item])
      setSearchResults((curr: UserGenTypes[]) => [...curr, item])
    })

    setLoading(false)

    return

  }

  // handles Search form
  function handleSearchForm(e: React.FormEvent) {

    e.preventDefault()

    // if submit is clicked, runs function to filter users
    searchWhileTyping()

  }

  // runs when User is typing on Search Input, filtering users results on Home Page
  function searchWhileTyping() {

    // resets Results State if input is empty
    if (searchInput.current!.value === '') {

      setSearchResults(users)

      return

    }

    setSearchResults((curr: UserGenTypes[]) => {
      return curr.filter((item: UserGenTypes) => {

        const input = searchInput.current!.value.toLowerCase()

        const name = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`
        const email = item.email.toLowerCase().slice(0, input.length)
        const username = item.login.username.toLowerCase().slice(0, input.length)

        if (name.includes(input)) {
          return item
        }
        else if (email.includes(input)) {
          return item
        }
        else if (username.includes(input)) {
          return item
        }
        return null

      })
    })

  }

  useEffect(() => {

    fetchUsersOnHomePage(paginationForMoreResults)

  }, [paginationForMoreResults])

  return (
    <div className={Styles.container}>
      <h1>Início</h1>

      {/* <p>Após o Login, a página principal deve conter uma listagem de usuários gerada a partir da api Random User Generator, a lista deve conter a foto do usuário, nome completo, email, username e idade. Além disso, os requests devem ser páginados, porém, é de critério do participante do desafio a quantidade de resultados a serem exibidos por página e variações para o mesmo. Também, deve haver uma search para buscar usuários por nome, email ou username;</p> */}

      <form
        role='search'
        onSubmit={(e) => handleSearchForm(e)}
        id={Styles.form_search}
      >
        <div>

          <input type='text'
            aria-labelledby='small_form_description'
            id='search' name='search'
            aria-controls='search_results'
            ref={searchInput}
            onChange={() => searchWhileTyping()}
            placeholder='Pesquisar por...'
          ></input>

          <button type='submit' title='Procurar Usuário'>
            <Search alt='Lupa' />
          </button>

        </div>

        <small id='small_form_description'>
          Pesquise por usuários dessa página, usando nome, email ou username.
        </small>

      </form>

      {((searchResults.length !== users.length) && (searchResults.length > 0)) && (

        <div id='search_results' className={Styles.search_results_container} aria-haspopup={searchResults.length > 0 ? true : false}>

          <ul>

            {searchResults.map((item: UserGenTypes, key: number) => (
              <UserSearchResult key={key} props={item} />
            ))}

          </ul>
        </div>

      )}

      <div className={Styles.users_container}>
        <h2>Usuários</h2>

        {users && (
          <ul>
            {users.map((item: UserGenTypes) => (
              <User key={item.login.sha256} props={item} />
            ))}
          </ul>
        )}

        <div className={Styles.button_container}>

          <button onClick={() => setPaginationForMoreResults((curr) => curr + 1)}>
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