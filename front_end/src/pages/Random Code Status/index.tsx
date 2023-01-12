import React, { FormEvent, useState } from 'react'
import Styles from './RandomStatusCode.module.css'
import Search from '../../img/icons/Search'
import Question from '../../img/icons/Question'
import ImgNotFound from '../../img/not-found.png'
import { allStatusCode } from '../../api/randomDogImg'

function RandomStatusCode() {

  const [loading, setLoading] = useState<boolean>(false)

  const [openAdviseStatusCodePanel, setOpenAdviseStatusCodePanel] = useState<boolean>(false)

  const [statusCodeInput, setStatusCodeInput] = useState<string>()

  const statusCodes: { code: string, message: string }[] = allStatusCode()

  // sets chose status code to State 
  async function handleForm(e: FormEvent<HTMLFormElement>) {

    e.preventDefault()

    setLoading(true)

    const statusCode: string = (e.target as HTMLFormElement).status_code.value

    setStatusCodeInput(statusCode)

    setLoading(false)

    return

  }

  // fetch img source based on selected code status
  function imgSrcBasedOnCodeStatus() {

    return `https://http.cat/${statusCodeInput}`

  }

  return (
    <div className={Styles.container}>
      <h1>Status Code Aleatório</h1>

      <p>Veja uma imagem diferente cada vez que selecionar um código.</p>

      {/* <p>Em uma segunda página, o usuário deve ser capaz de selecionar um status code http qualquer, e, após a seleção, deve ser retornada uma imagem da api HTTP Cat relacionada ao status escolhido, caso não exista tal imagem, deve ser retornada uma imagem de not found à critério de escolha do participante do desafio; */}

      <div className={Styles.main_content}>

        <div className={Styles.form_container}>
          <form
            onSubmit={(e) => handleForm(e)}
            id={Styles.form_search}
          >

            <div>

              <select
                aria-label='Escolha o código do status que deseja.'
                id='status_code' name='status_code'
              >
                <option disabled>Escolha aqui o código do status que deseja ver...</option>

                {statusCodes.map((item: { code: string, message: string }) => (
                  <option value={item.code} key={item.code}>{item.code} - {item.message}</option>
                ))}

              </select>

              <button type='submit' title='Procurar Esse Código'>
                <Search alt='Lupa' /> Procurar Esse Código
              </button>

            </div>

          </form>

          <button type='button'
            id={Styles.show_status_codes_btn}
            title='Mostrar Significado dos Códigos'
            aria-labelledby='Mostrar Significado dos Códigos'
            arai-haspopup='dialog'
            aria-controls={Styles.status_code_panel}
            aria-expanded={openAdviseStatusCodePanel ? 'true' : 'false'}
            onClick={() => setOpenAdviseStatusCodePanel(!openAdviseStatusCodePanel)}
          >
            <Question />
          </button>

          {openAdviseStatusCodePanel && (
            <div id={Styles.status_code_panel}>
              <h5>Significado dos Códigos</h5>

              <ul>
                <li><b>1xx</b> - Códigos Informativos</li>
                <li><b>2xx</b> - Códigos de Êxito</li>
                <li><b>3xx</b> - Códigos de Redirecionamento</li>
                <li><b>4xx</b> - Códigos de Erro no Cliente</li>
                <li><b>5xx</b> - Códigos de Erro no Servidor</li>
              </ul>
            </div>
          )}

        </div>

        <div
          className={Styles.result_container}
        >
          <h2>Imagem para o Código <b>{statusCodeInput ? statusCodeInput : (<span>...</span>)}</b></h2>

          {!loading && (
            statusCodeInput ? (

              <object data={imgSrcBasedOnCodeStatus()}
                width='300px' height='auto'
                type='image/jpg'
                aria-label={`Código de Status ${statusCodeInput}`}
              >
                <img src={ImgNotFound}
                  alt='Imagem Não Disponível.'
                  width='300px' height='auto'
                >
                </img>
              </object>
            ) : (
              <span className={Styles.loading_background}></span>
            )

          )}

        </div>

      </div>
    </div>
  )
}

export default RandomStatusCode