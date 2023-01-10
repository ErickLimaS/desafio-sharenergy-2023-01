import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Styles from './AlertMessage.module.css'
import Correct from '../../img/icons/Correct'
import Wrong from '../../img/icons/Wrong'


function AlertMessage({ props }: { props: { success: boolean, message: string } }) {

    const [keepOnDisplay, setKeepOnDisplay] = useState<boolean>(true)

    return (

        <div role='alertdialog'
            className={Styles.container}
            data-keep-on-display={keepOnDisplay ? true : false}
            data-successful={props.success}
        >

            {props.success ?
                (
                    <Correct alt='Tudo Certo!' />
                ) : (
                    <Wrong  alt='Um Erro Aconteceu!'/>
                )}

            <h1>{props.success ? 'Tudo Certo!' : 'Um Erro Aconteceu!'}</h1>

            <p>{props.message || 'Erro Interno.'}</p>

            {!props.success ?
                (
                    <Link to='/customers'>Ir para página Clientes</Link>
                ) : (
                    <button type='button' onClick={() => setKeepOnDisplay(false)}>
                        Tentar Novamente
                    </button>
                )}

        </div>

    )

}

export default AlertMessage