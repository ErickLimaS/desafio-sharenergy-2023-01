import React, { ReactElement } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import './Layout.css'

function Layout({ children }: { children: ReactElement }) {
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