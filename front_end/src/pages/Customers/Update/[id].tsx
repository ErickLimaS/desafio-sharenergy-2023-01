import React, { useLayoutEffect, useState } from 'react'
import Styles from './UpdateCustomer.module.css'
import { getAllCustomers, updateCustomer } from '../../../api/customersMongoServer'
import { Params, useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'
import ArrowUp from '../../../img/icons/ChevronUp'
import Loading from '../../../img/icons/Loading200Px'

function UpdateCustomer() {

  // gets the Customer ID from URL
  const { id }: Readonly<Params<string>> = useParams()

  const firstNameInput = React.useRef<HTMLInputElement>(null)
  const lastNameInput = React.useRef<HTMLInputElement>(null)
  const emailInput = React.useRef<HTMLInputElement>(null)
  const cpfInput = React.useRef<HTMLInputElement>(null)
  const dddTelInput = React.useRef<HTMLInputElement>(null)
  const telInput = React.useRef<HTMLInputElement>(null)
  const streetInput = React.useRef<HTMLInputElement>(null)
  const countyInput = React.useRef<HTMLInputElement>(null)
  const stateInput = React.useRef<HTMLInputElement>(null)
  const countryInput = React.useRef<HTMLInputElement>(null)

  const [customer, setCustomer] = useState<CustomerTypes>()

  const navigate = useNavigate()

  // verifies if CPF is correct and exist
  function verifyCpf(cpf: string) {

    let some: number = 0;
    let left: number

    for (let i = 1; i <= 9; i++) some = some + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    left = (some * 10) % 11;

    if ((left === 10) || (left === 11)) left = 0;
    if (left !== parseInt(cpf.substring(9, 10))) return false;

    some = 0;
    for (let i = 1; i <= 10; i++) some = some + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    left = (some * 10) % 11;

    if ((left === 10) || (left === 11)) left = 0;

    if (left !== parseInt(cpf.substring(10, 11))) return false;

    return true;

  }

  // Shows the server response to the user 
  function showServerResponse(res: { success: boolean, message: string }) {

    if (res.success) {
      return Swal.fire({
        title: 'Tudo Certo!',
        text: `${res.message || 'O cliente foi atualizado com sucesso.'}`,
        icon: 'success',
        confirmButtonColor: 'var(--success)',
        confirmButtonText: 'Voltar para página Clientes',
        didClose: () => navigate('/customers')
      })
    }

    return Swal.fire({
      title: 'Um Erro Aconteceu!',
      text: `${res.message || ''}`,
      icon: 'error',
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Tentar Novamente'
    })

  }

  // submits form and sets a response with what server returns
  async function handleForm(e: React.FormEvent) {

    e.preventDefault()

    if (cpfInput.current!.value !== '') {
      if (verifyCpf(cpfInput.current!.value) === false) {

        Swal.fire({
          title: 'CPF não válido.',
          text: 'O CPF digitado não é valido.',
          icon: 'warning',
          confirmButtonColor: 'var(--warning)',
          confirmButtonText: 'Tentar Novamente'
        })

        return

      }
    }

    const res = await updateCustomer(
      id as string,
      {
        name: {
          first: firstNameInput.current!.value,
          last: lastNameInput.current!.value
        },
        email: emailInput.current!.value,
        address: {
          street: streetInput.current!.value,
          county: countyInput.current!.value,
          state: stateInput.current!.value,
          country: countryInput.current!.value
        },
        tel: [{
          ddd: dddTelInput.current!.value,
          tel: telInput.current!.value,
        }],
        cpf: cpfInput.current!.value
      }
    )

    // Shows the server response to the user
    showServerResponse(res)

  }

  // fetch customer info from DB
  async function fetchCustomer(id: string) {

    const res = await getAllCustomers(`?id=${id}`)

    setCustomer(res.customers[0])

  }

  useLayoutEffect(() => {

    fetchCustomer(id as string)

  }, [])

  return (
    <div className={Styles.container} data-loading={!customer ? true : false}>

      {customer ? (
        <>
          <button role='link' type='button' onClick={() => navigate(-1)}>
            <ArrowUp style={{ transform: 'rotate(270deg)', marginRight: '8px' }} /> Voltar
          </button>

          <h1>Atualizar <span>{customer!.name.first} {customer!.name.last}</span></h1>

          <p>Mude as informações que quiser do cliente. Deixe vazio os campos que você não quer mudar.</p>


          <div className={Styles.form_container}>

            <form onSubmit={(e) => handleForm(e)}>

              <div className={`${Styles.flex_row} ${Styles.name_container}`}>

                <div className={Styles.flex_column}>
                  <label>
                    Primeiro Nome
                    <input type='text' ref={firstNameInput}
                      name='first_name'
                      title='Primeiro Nome'
                      defaultValue={customer.name.first}
                    ></input>
                  </label>
                </div>
                <div className={Styles.flex_column}>
                  <label>
                    Último Nome
                    <input type='text' ref={lastNameInput}
                      name='last_name'
                      title='Último Nome'
                      defaultValue={customer.name.last}
                    ></input>
                  </label>
                </div>

              </div>

              <div className={Styles.flex_column}>
                <label>
                  Email
                  <input type='email' ref={emailInput}
                    name='email'
                    title='Email'
                    defaultValue={customer.email}
                  ></input>
                </label>
              </div>

              <div className={Styles.flex_column}>
                <label>
                  CPF
                  <input type='text' ref={cpfInput}
                    name='cpf'
                    pattern="[0-9]{11}"
                    title='Ex: 12345678900'
                    defaultValue={customer.cpf}
                  ></input>
                  <small>Apenas números. Nada de traço ou ponto.</small>
                </label>
              </div>

              <div className={`${Styles.flex_row} ${Styles.tel_container}`}>

                <div className={Styles.flex_column}>
                  <label>
                    DDD
                    <input type='text' ref={dddTelInput}
                      name='ddd'
                      title='DDD do Estado deste Telefone de Contato'
                      defaultValue={customer.tel[0].ddd}
                      pattern="[0-9]{2}"
                    ></input>
                    <small>Ex: 11</small>
                  </label>
                </div>
                <div className={Styles.flex_column}>
                  <label>
                    Telefone de Contato
                    <input type='text' ref={telInput}
                      name='tel'
                      title='Resto do Telefone de Contato'
                      defaultValue={customer.tel[0].tel}
                      pattern="[0-9]{8,9}"
                    ></input>
                    <small>Precisa do 9 inicial, dependendo de sua região.</small>
                  </label>
                </div>

              </div>

              <div className={Styles.flex_column}>
                <label>
                  Rua onde Mora
                  <input type='text' ref={streetInput}
                    name='street'
                    title='Rua onde Mora'
                    defaultValue={customer.address.street}
                  ></input>
                </label>
              </div>

              <div className={Styles.flex_row}>

                <div className={Styles.flex_column}>
                  <label>
                    Bairro
                    <input type='text' ref={countyInput}
                      name='county'
                      title='Bairro'
                      defaultValue={customer.address.county}
                    ></input>
                  </label>
                </div>

                <div className={Styles.flex_column}>
                  <label>
                    Estado
                    <input type='text' ref={stateInput}
                      name='state'
                      title='Estado'
                      defaultValue={customer.address.state}
                    ></input>
                  </label>
                </div>

                <div className={Styles.flex_column}>
                  <label>
                    País
                    <input type='text' ref={countryInput}
                      name='country'
                      title='País'
                      defaultValue={customer.address.country}
                    ></input>
                  </label>
                </div>

              </div>

              <button type='submit'>Atualizar Cliente</button>

            </form>

          </div >
        </>
      ) :
        (
          <div id={Styles.loading} aria-busy="true" >
            <Loading alt="Carregando..." />
          </div>
        )
      }

    </div >

  )
}

export default UpdateCustomer