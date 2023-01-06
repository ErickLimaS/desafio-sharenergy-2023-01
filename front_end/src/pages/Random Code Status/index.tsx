import React, { FormEvent, useState } from 'react'
import Styles from './RandomStatusCode.module.css'
import Search from '../../img/icons/Search'
import Question from '../../img/icons/Question'
import ImgNotFound from '../../img/not-found.png'

function RandomStatusCode() {

  const [loading, setLoading] = useState<boolean>(false)

  const [openAdviseStatusCodePanel, setOpenAdviseStatusCodePanel] = useState<boolean>(false)

  const [statusCodeInput, setStatusCodeInput] = useState<string>()

  const statusCodes: { code: string, message: string }[] = [
    { code: '100', message: 'Continue' },
    { code: '101', message: 'Switching Protocols' },
    { code: '102', message: 'Processing' },
    { code: '103', message: 'Early Hints' },
    { code: '200', message: 'OK' },
    { code: '201', message: 'Created' },
    { code: '202', message: 'Accepted' },
    { code: '203', message: 'Non-Authoritative Information' },
    { code: '204', message: 'No Content' },
    { code: '205', message: 'Reset Content' },
    { code: '206', message: 'Partial Content' },
    { code: '207', message: 'Multi-Status' },
    { code: '208', message: 'Already Reported' },
    { code: '226', message: 'IM Used' },
    { code: '300', message: 'Multiple Choices' },
    { code: '301', message: 'Moved Permanently' },
    { code: '302', message: 'Found (Previously "Moved temporarily")' },
    { code: '303', message: 'See Other' },
    { code: '304', message: 'Not Modified' },
    { code: '305', message: 'Use Proxy' },
    { code: '306', message: 'Switch Proxy' },
    { code: '307', message: 'Temporary Redirect' },
    { code: '308', message: 'Permanent Redirect' },
    { code: '400', message: 'Bad Request' },
    { code: '401', message: 'Unauthorized' },
    { code: '402', message: 'Payment Required' },
    { code: '403', message: 'Forbidden' },
    { code: '404', message: 'Not Found' },
    { code: '405', message: 'Method Not Allowed' },
    { code: '406', message: 'Not Acceptable' },
    { code: '407', message: 'Proxy Authentication Required' },
    { code: '408', message: 'Request Timeout' },
    { code: '409', message: 'Conflict' },
    { code: '410', message: 'Gone' },
    { code: '411', message: 'Length Required' },
    { code: '412', message: 'Precondition Failed' },
    { code: '413', message: 'Payload Too Large' },
    { code: '414', message: 'URI Too Long' },
    { code: '415', message: 'Unsupported Media Type' },
    { code: '416', message: 'Range Not Satisfiable' },
    { code: '417', message: 'Expectation Failed' },
    { code: '418', message: "I'm a teapot" },
    { code: '421', message: 'Misdirected Request' },
    { code: '422', message: 'Unprocessable Entity' },
    { code: '423', message: 'Locked' },
    { code: '424', message: 'Failed Dependency' },
    { code: '425', message: 'Too Early' },
    { code: '426', message: 'Upgrade Required' },
    { code: '428', message: 'Precondition Required' },
    { code: '429', message: 'Too Many Requests' },
    { code: '431', message: 'Request Header Fields Too Large' },
    { code: '451', message: 'Unavailable For Legal Reasons' }
  ]

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

                {statusCodes.map((item: { code: string, message: string }): any => (
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
            <Question />{/* Lista de Códigos de Status */}
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