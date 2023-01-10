import React, { useState } from 'react'
import Styles from './Register.module.css'
import { Link } from 'react-router-dom'
import ArrowUp from '../../../img/icons/ChevronUp'
import { registerNewCustomer } from '../../../api/customersMongoServer'
import AlertMessage from '../../../Components/AlertMessage'

function Register() {

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

  const [serverResponse, setServerResponse] = useState<{ success: boolean, message: string }>()

  // verifies if CPF is correct and it really exists
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

  // submits form and sets a response with what server returns
  async function handleForm(e: React.FormEvent) {

    e.preventDefault()

    if (verifyCpf(cpfInput.current!.value) === false) {

      return alert('cpf')

    }

    const res = await registerNewCustomer({
      name: {
        first: firstNameInput.current!.value,
        last: lastNameInput.current!.value
      },
      email: emailInput.current!.value,
      tel: {
        ddd: dddTelInput.current!.value,
        tel: telInput.current!.value,
      },
      cpf: cpfInput.current!.value
    })

    setServerResponse(res)

    return

  }

  return (

    <>
      {serverResponse && (
        <AlertMessage props={serverResponse} />
      )}

      <div className={Styles.container}>

        <Link to='/customers'>
          <ArrowUp style={{ transform: 'rotate(270deg)', marginRight: '8px' }} /> Voltar
        </Link>

        <h1>Cadastrar Cliente</h1>

        <div className={Styles.form_container}>

          <form onSubmit={(e) => handleForm(e)}>

            <div className={`${Styles.flex_row} ${Styles.name_container}`}>

              <div className={Styles.flex_column}>
                <label>
                  Primeiro Nome
                  <input type='text' ref={firstNameInput}
                    name='first_name'
                    title='Primeiro Nome'
                  ></input>
                </label>
              </div>
              <div className={Styles.flex_column}>
                <label>
                  Último Nome
                  <input type='text' ref={lastNameInput}
                    name='last_name'
                    title='Último Nome'
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
                ></input>
              </label>
            </div>

            <div className={Styles.flex_column}>
              <label>
                CPF
                <input type='text' ref={cpfInput}
                  name='cpf'
                  title='CPF do Cliente'
                ></input>
                <small>Apenas números.</small>
              </label>
            </div>

            <div className={`${Styles.flex_row} ${Styles.tel_container}`}>

              <div className={Styles.flex_column}>
                <label>
                  DDD
                  <input type='text' ref={dddTelInput}
                    name='ddd'
                    title='DDD do Telefone de Contato'
                  ></input>
                  <small>Ex: 11.</small>
                </label>
              </div>
              <div className={Styles.flex_column}>
                <label>
                  Telefone de Contato
                  <input type='text' ref={telInput}
                    name='tel'
                    title='Telefone de Contato'
                  ></input>
                  <small>Apenas números.</small>
                </label>
              </div>

            </div>

            <div className={Styles.flex_column}>
              <label>
                Rua onde Mora
                <input type='text' ref={streetInput}
                  name='street'
                  title='Rua onde Mora'
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
                  ></input>
                </label>
              </div>

              <div className={Styles.flex_column}>
                <label>
                  Estado
                  <input type='text' ref={stateInput}
                    name='state'
                    title='Estado'
                  ></input>
                </label>
              </div>

              <div className={Styles.flex_column}>
                <label>
                  País
                  <input type='text' ref={countryInput}
                    name='country'
                    title='País'
                  ></input>
                </label>
              </div>

            </div>

            <button type='submit'>Cadastrar</button>

          </form>

        </div >

      </div >
    </>
  )
}

export default Register