import React from 'react'
import '../Layout.css'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <header id='header'>
            <Link to='/'>Desafio</Link>

            <div className='buttons_container'>

                <button>
                    Login
                </button>

            </div>

        </header>
    )
}

export default Header