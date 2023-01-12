import React, { useState } from 'react'
import Styles from './Update.module.css'
import Search from '../../../img/icons/Search'
import { getAllCustomers } from '../../../api/customersMongoServer'
import CustomerResult from '../../../Components/Customers/CustomerResult'

function Update() {

  const searchInput = React.useRef<HTMLInputElement>(null)
  const queryRadioInput = React.useRef<HTMLInputElement>(null)

  const [customersFromServer, setCustomersFromServer] = useState<CustomerTypes[]>([])

  async function handleSearchForm(e: React.FormEvent) {

    e.preventDefault()

    const form = e.target as HTMLFormElement

    const res = await getAllCustomers(`?${form.query_type.value}=${searchInput.current!.value}`)

    setCustomersFromServer(res.customers)

  }

  return (
    <div className={Styles.container}>

      <h1>Atualizar Cliente</h1>

      <section>

        <form
          role='search'
          onSubmit={(e) => handleSearchForm(e)}
          id={Styles.form_search}
        >

          <div className={Styles.query_radio_container}>
            <p>Tipo</p>

            <div>
              <label>
                CPF
                <input type='radio' name='query_type' ref={queryRadioInput} value='cpf' defaultChecked></input>
              </label>
              <label>
                Email
                <input type='radio' name='query_type' ref={queryRadioInput} value='email'></input>
              </label>
              <label>
                Último Nome
                <input type='radio' name='query_type' ref={queryRadioInput} value='last_name'></input>
              </label>
            </div>

          </div>

          <div className={Styles.search_input_container}>

            <input type='text'
              aria-labelledby='small_form_description'
              id='search' name='search'
              aria-controls='search_results'
              ref={searchInput}
              required
              placeholder='CPF, email ou último nome do cliente'
            ></input>

            <button type='submit' title='Procurar Usuário'>
              <Search alt='Lupa' />
            </button>

          </div>

          <small id='small_form_description'>
            Pesquise pelo cliente cadastrado no Banco de Dados.
          </small>

        </form>

      </section>

      {customersFromServer.length > 0 && (
        <section className={Styles.customers_container}>

          <h2>Selecione o clinte a atualizar</h2>

          <ul className={Styles.search_results_container}>
            {customersFromServer.map((item: CustomerTypes) => (
              <CustomerResult key={item._id} props={item} />
            ))}
          </ul>

        </section>
      )}

    </div>
  )
}

export default Update