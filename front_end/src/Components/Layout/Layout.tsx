import React, { ReactElement, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import './Layout.css'
import { useAppSelector } from '../../redux/hooks'
import { useNavigate } from 'react-router'

function Layout({ children }: { children: ReactElement }) {

    const user: any = useAppSelector((state) => state.adminUser)

    const navigate = useNavigate()

    useEffect(() => {

        // if user is not logged in, he will be redirect to login page
        if (!user.username && !user.token) {

            navigate('/login')

        }

    }, [])

    return (
        <div id='main_container'>
            <Header />

            <Sidebar />

            <main id='main_content'>

                {children}

            </main>

            <Footer />
        </div>
    )
}

export default Layout