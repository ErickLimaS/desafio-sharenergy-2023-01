import React, { useLayoutEffect, useState } from 'react'
import '../Layout.css'
import Styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import ArrowBarRight from '../../../img/icons/ArrowBarRight'
import DogPaw from '../../../img/icons/DogPaw2'
import Code from '../../../img/icons/Code'
import PeopleFill from '../../../img/icons/PeopleFill'
import ChevronUp from '../../../img/icons/ChevronUp'
import HouseFill from '../../../img/icons/HouseFill'
import { useAppSelector } from '../../../redux/hooks'

function Sidebar() {

    // reduce size of the sidebar
    const [shrink, setShrink] = useState<boolean | null>(null)

    const user: any = useAppSelector((state) => state.adminUser)

    // On mobile screen and if user is not logged in, menu will be closed.
    useLayoutEffect(() => {

        if (window.screen.width < 720 || (!user.username && !user.token)) {
            setShrink(true)
        }

    }, [])

    return (
        <div id='sidebar' data-shrink-sidebar={shrink} className={Styles.container}>

            <div className={Styles.nav_heading}
                data-user-logged-in={user.username && user.token ? true : false}
            >
                <h6>Navegação</h6>

                <button type='button'
                    id={Styles.btn_shrink_navbar}
                    aria-expanded={shrink ? false : true}
                    aria-controls='navigation_links'
                    title={
                        shrink ? 'Expandir menu de navegação.' : 'Recolher menu de navegação.'
                    }
                    aria-label={
                        shrink ? 'Expandir menu de navegação.' : 'Recolher menu de navegação.'
                    }
                    onClick={() => setShrink(shrink ? !shrink : true)}
                >
                    {shrink ?
                        <>
                            <span data-desktop-icon='true'>
                                <ArrowBarRight
                                    alt='Icone Seta Para Esquerda.'
                                    style={{
                                        transition: 'all ease 500ms', transform: 'rotate(0deg)'
                                    }} />
                            </span>
                            <span data-mobile-icon='true'>
                                <ChevronUp
                                    alt='Icone Seta Para Cima.'
                                    style={{
                                        transition: 'all ease 500ms', transform: 'rotate(180deg)'
                                    }} />
                            </span>
                        </>
                        :
                        <>
                            <span data-desktop-icon='true'>
                                <ArrowBarRight
                                    alt='Icone Seta Para Direita.'
                                    style={{
                                        transition: 'all ease 500ms', transform: 'rotate(180deg)'
                                    }} />
                            </span>
                            <span data-mobile-icon='true'>
                                <ChevronUp
                                    alt='Icone Seta Para Baixo.'
                                    style={{
                                        transition: 'all ease 500ms', transform: 'rotate(0deg)'
                                    }} />
                            </span>
                        </>
                    }
                </button>
            </div>

            <nav id='navigation_links'>
                <ul>
                    <li><Link to='/'>
                        <HouseFill /> <span>Início</span>
                    </Link></li>
                    {/* <li><Link to='/login'><span>Login</span></Link></li> */}
                    <li><Link to='/customers'>
                        <PeopleFill /> <span>Clientes</span>
                    </Link></li>
                    <li><Link to='/random-status-code'>
                        <Code /> <span>Status Code Aleatório</span>
                    </Link></li>
                    <li><Link to='/random-dog-image'>
                        <DogPaw id={Styles.resize} /> <span>Cachorro Aleatório</span>
                    </Link></li>
                </ul>
            </nav>
        </div>

    )
}

export default Sidebar