import React, { useEffect, useState } from 'react'
import '../Layout.css'
import './Header.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import DoorOpenFill from '../../../img/icons/DoorOpenFill'
import ChevronDown from '../../../img/icons/ChevronDown'
import { useAppSelector } from '../../../redux/hooks'
import { store } from '../../../store'
import { loginUser } from '../../../redux/actions/userActions'

function Header() {

    const [userMenuExpanded, setUserMenuExpanded] = useState<boolean>(false)

    const adminUser: any = useAppSelector((state) => state.adminUser)

    const navigate = useNavigate()

    // logsout user 
    function logoutUser() {

        if (adminUser) {
            store.dispatch(loginUser('logout'))

            return

        }

    }

    // if user is logged in, redirects to home page
    useEffect(() => {

        // if (adminUser.username && adminUser.token) {
        //     navigate('/')
        // }

    }, [adminUser])

    return (
        <header id='header'>
            <Link to='/'>Desafio</Link>

            <div className='user' data-expanded={userMenuExpanded ? true : false}>

                <button type='button'
                    onClick={adminUser.username ?
                        () => setUserMenuExpanded(!userMenuExpanded) :
                        () => navigate('/login')}
                    aria-haspopup={userMenuExpanded ? true : false}
                    aria-controls='user_menu'
                    aria-label={userMenuExpanded ? 'Fechar Menu do Usuário' : 'Abrir Menu do Usuário'}
                    title={userMenuExpanded ? 'Fechar Menu do Usuário' : 'Abrir Menu do Usuário'}
                >
                    {adminUser.username ? <>
                        {adminUser.username} < ChevronDown alt='Menu do Usuário' style={{
                            transition: 'all ease 500ms',
                            transform: `rotate(${userMenuExpanded ? '180deg' : '0deg'})`
                        }} />
                    </>
                        : 'Login'
                    }
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