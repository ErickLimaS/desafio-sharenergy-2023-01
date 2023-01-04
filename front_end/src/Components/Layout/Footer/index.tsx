import React from 'react'
import '../Layout.css'
import Styles from './Footer.module.css'

function Footer() {
  return (
    <footer id='footer' className={Styles.container}>
      <nav>

        <div className={Styles.links_wrapper}>
          <h6>API</h6>
          <ul>
            <li>
              <a href='https://randomuser.me/' target='_blank' rel='noreferrer'>
                Random User Generator
              </a>
            </li>
            <li>
              <a href='https://http.cat/' target='_blank' rel='noreferrer'>
                HTTP Cat
              </a>
            </li>
            <li>
              <a href='https://random.dog/' target='_blank' rel='noreferrer'>
                Random Dog
              </a>
            </li>
          </ul>

        </div>
        <div className={Styles.links_wrapper}>
          <h6>Projeto</h6>

          <a href='https://github.com/ErickLimaS/desafio-sharenergy-2023-01' target='_blank' rel='noreferrer'>
            Repositório No GitHub
          </a>
        </div>
      </nav>
      <small>Desafio Sharenergy</small>
    </footer>
  )
}

export default Footer