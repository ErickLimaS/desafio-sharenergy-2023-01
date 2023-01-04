import React, { useState } from 'react'
import '../Layout.css'
import './Header.css'
import { Link } from 'react-router-dom'
import DoorOpenFill from '../../../img/icons/DoorOpenFill'
import ChevronDown from '../../../img/icons/ChevronDown'

function Header() {

    const [userMenuExpanded, setUserMenuExpanded] = useState<boolean>(false)

    function logoutUser() {



    }

    return (
        <header id='header'>
            <Link to='/'>Desafio</Link>

            <div className='user' data-expanded={userMenuExpanded ? true : false}>

                <button type='button'
                    onClick={() => setUserMenuExpanded(!userMenuExpanded)}
                    aria-haspopup={userMenuExpanded ? true : false}
                    aria-controls='user_menu'
                    aria-label={userMenuExpanded ? 'Fechar Menu do Usuário' : 'Abrir Menu do Usuário'}
                    title={userMenuExpanded ? 'Fechar Menu do Usuário' : 'Abrir Menu do Usuário'}
                >
                    User <ChevronDown alt='Menu do Usuário' style={{
                        transition: 'all ease 500ms',
                        transform: `rotate(${userMenuExpanded ? '180deg' : '0deg'})`
                    }} />
                </button>

                <ul id='user_menu'
                    role='menu'
                    aria-label='Menu do Usuário'
                    data-expanded={userMenuExpanded ? true : false}
                >
                    <li>
                        <button type='button' onClick={() => logoutUser()}>
                            <DoorOpenFill alt='Logout' />  Log Out
                        </button>
                    </li>
                </ul>

            </div>

        </header>
    )
}

export default Header