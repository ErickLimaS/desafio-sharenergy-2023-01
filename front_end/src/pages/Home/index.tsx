import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api/randomUserGenerator'
import User from '../../Components/Home/User'
import Styles from './Home.module.css'
import Loading from '../../img/icons/Loading200Px'
import Search from '../../img/icons/Search'
import Plus from '../../img/icons/Plus'
import UserSearchResult from '../../Components/Home/UserSearchResult'

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
  const [searchResults, setSearchResults] = useState<UserTypes[] | any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const searchInput = React.useRef<HTMLInputElement>(null)

  const [paginationForMoreResults, setPaginationForMoreResults] = useState<number>(1)

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

      setSearchResults([])

      return

    }

    const searchedItem: string = searchInput.current!.value.toLowerCase()

    // Filters results on Users State, then returns the User 
    users.forEach((user: UserTypes) => {

      // Lower case and slice all values to be filtered even more, getting closer to the desirable result when its been typed on input
      const userFirstName: string = user.name.first.toLowerCase().slice(0, searchedItem.length)
      const userEmail: string = user.email.toLowerCase().slice(0, searchedItem.length)
      const userUsername: string = user.login.username.toLowerCase().slice(0, searchedItem.length)

      // filters which user was already added to Results State. If true, wont be added.
      function isUserAlreadyOnResults(currentUserToBeInserted: UserTypes) {

        if (searchResults.length === 0) {

          return false

        }

        const isDoubled = searchResults.every((userOnResults: UserTypes) => {
          if (currentUserToBeInserted.email === userOnResults.email) {

            console.log(currentUserToBeInserted.email, userOnResults.email)

            return true

          }

          return false
        })

        return isDoubled

      }

      // checks if the input value is equal with the first name
      if (searchedItem === userFirstName) {

        // console.log(user.name.first)

        // console.log(isUserAlreadyOnResults(user))

        switch (isUserAlreadyOnResults(user)) {

          case true:

            return

          case false:

            setSearchResults((curr: any) => [...curr, user])

            return

          default:

            setSearchResults(user)

            return

        }

      }

      // checks if the input value is equal with the email
      else if (searchedItem === userEmail) {

        // console.log(user.name.first)

        // console.log(isUserAlreadyOnResults(user))

        switch (isUserAlreadyOnResults(user)) {

          case true:

            return

          case false:

            setSearchResults((curr: any) => [...curr, user])

            return

          default:

            setSearchResults(user)

            return

        }

      }

      // checks if the input value is equal with the username
      else if (searchedItem === userUsername) {

        // console.log(user.name.first)

        // console.log(isUserAlreadyOnResults(user))

        switch (isUserAlreadyOnResults(user)) {

          case true:

            return

          case false:

            setSearchResults((curr: any) => [...curr, user])

            return

          default:

            setSearchResults(user)

            return


        }

      }

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

      {searchResults.length > 0 && (
        <div id='search_results' className={Styles.search_results_container} aria-haspopup={searchResults.length > 0 ? true : false}>

          <ul>

            {searchResults.map((item: UserTypes, key: number) => (
              <UserSearchResult key={key} props={item} />
            ))}

          </ul>
        </div>
      )}

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