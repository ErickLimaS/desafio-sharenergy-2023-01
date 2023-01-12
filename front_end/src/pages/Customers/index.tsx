import React, { useEffect, useState } from 'react'
import Styles from './Customers.module.css'
import { customerTypes, getAllCustomers } from '../../api/customersMongoServer'
import { Link } from 'react-router-dom'
import Update from '../../img/icons/Update'
import AddUser from '../../img/icons/AddUser'
import RemoveUser from '../../img/icons/RemoveUser'
import CustomerResult from '../../Components/Customers/CustomerResult'

function Customers() {

    const [customers, setCustomers] = useState<customerTypes[]>([])

    async function fetchCustomers() {

        const res = await getAllCustomers()

        setCustomers(res.customers)

    }

    useEffect(() => {

        fetchCustomers()

    }, [])

    return (
        <div className={Styles.container}>
            <h1>Clientes</h1>
            {/* <p>
                Em uma quarta página, deve haver uma lista de clientes, através da qual o usuário deve ser capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, telefone, endereço e cpf.

            </p> */}

            <section role='navigation' className={Styles.navigation}>

                <Link to='register' data-register>
                    <AddUser alt='Cadastrar Cliente. Icon from https://thenounproject.com/shuaibtawfeeq/' />
                    Cadastrar Cliente
                </Link>

                <Link to='update' data-update>
                    <Update alt='Atualizar Cliente.' />
                    Atualizar Cliente
                </Link>

                <Link to='delete' data-delete>
                    <RemoveUser alt='Deletar Cliente. Icon from https://thenounproject.com/shuaibtawfeeq/' />
                    Deletar Cliente
                </Link>

            </section>

            <section className={Styles.customers_container}>

                <h2>Já Cadastrados</h2>

                <nav>
                    <ul>

                        {customers.length > 0 && (
                            customers.map((customer: customerTypes) => (
                                <CustomerResult props={customer} key={customer._id} />
                            ))
                        )}

                    </ul>
                </nav>

            </section>


        </div>
    )
}

export default Customers