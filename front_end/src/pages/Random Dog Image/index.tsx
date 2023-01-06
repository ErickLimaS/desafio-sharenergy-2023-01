import React, { useEffect, useState } from 'react'
import Styles from './RandomDogImage.module.css'
import { fetchNewImg } from '../../api/randomDogImg'
import Loading from '../../img/icons/Loading200Px'
import Refresh from '../../img/icons/ArrowClockwise'
import ImgNotFound from '../../img/not-found.png'

function RandomDogImage() {

  const [loading, setLoading] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>()

  // fetch new img source and stores on State
  async function refreshImg() {

    setLoading(true)

    const res: string = await fetchNewImg()

    setImgSrc(res)

    setLoading(false)

    return
  }

  useEffect(() => {

    refreshImg()

  }, [])

  return (
    <div className={Styles.container}>
      <h1>Cachorros Aleatórios</h1>

      <p>Veja uma imagem diferente cada vez que clicar no botão Atualizar.</p>

      {/* <p>Em uma terceira página, deve haver um botão de refresh que, ao ser clicado, deve retornar uma imagem aleatória da api Random Dog;*/}

      <div className={Styles.main_content}>

        <button
          id={Styles.refresh_btn}
          title='Mostrar Outra imagem de cachorro.'
          onClick={() => refreshImg()}
        >
          <Refresh />Atualizar Imagem
        </button>

        <div
          className={Styles.img_container}
        >

          {!loading ? (
            <object data={imgSrc}
              width='300px' height='auto'
              aria-label='Foto aleatória de cachorro.'
            >
              <img src={ImgNotFound}
                alt='Imagem Não Disponível.'
                width='300px' height='auto'
              >
              </img>
            </object>
          ) : (
            <Loading />
          )}

        </div>

      </div>
    </div>
  )
}

export default RandomDogImage