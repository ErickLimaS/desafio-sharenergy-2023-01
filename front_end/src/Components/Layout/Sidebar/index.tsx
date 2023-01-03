import React, { useState } from 'react'
import '../Layout.css'
import Styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import * as SVG from '../../../img/svg'

function Sidebar() {

    // reduce size of the sidebar
    const [shrink, setShrink] = useState<boolean | null>(null)

    return (
        <nav id='sidebar' data-shrink-sidebar={shrink} className={Styles.container}>

            <div className={Styles.nav_heading}>
                <h6>Navegação</h6>

                <button type='button'
                    id={Styles.btn_shrink_navbar}
                    onClick={() => setShrink(shrink ? !shrink : true)}
                >
                    {shrink ?
                        <>
                            <span data-desktop-icon='true'>{'1'}</span>
                            <span data-mobile-icon='true'>{'>'}</span>
                        </> :
                        <>
                            <span data-desktop-icon='true'>{'0'}</span>
                            <span data-mobile-icon='true'>{'<'}</span>
                        </>
                    }
                </button>
            </div>

            <ul>
                <li><Link to='/'><span>Início</span></Link></li>
                {/* <li><Link to='/login'><span>Login</span></Link></li> */}
                <li><Link to='/customers'><span>Clientes</span></Link></li>
                <li><Link to='/random-status-code'><span>Status Code Aleatório</span></Link></li>
                <li><Link to='/random-dog-image'><span>Cachorro Aleatória</span></Link></li>
            </ul>

            <ul>

            </ul>

        </nav>
    )
}

export default Sidebar