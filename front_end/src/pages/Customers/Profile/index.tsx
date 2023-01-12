import React, { useLayoutEffect, useState } from 'react'
import Styles from './Profile.module.css'
import { Params, useNavigate, useParams } from 'react-router'
import { customerTypes, getAllCustomers } from '../../../api/customersMongoServer'
import Loading from '../../../img/icons/Loading200Px'
import ArrowUp from '../../../img/icons/ChevronUp'
import Update from '../../../img/icons/Update'
import RemoveUser from '../../../img/icons/RemoveUser'
import CustomerProfile from '../../../Components/Customers/CustomerProfile'
import { Link } from 'react-router-dom'

function Profile() {

    const { id }: Readonly<Params<string>> = useParams()

    const [customer, setCustomer] = useState<customerTypes>()

    const navigate = useNavigate()

    // fetch customer info from DB
    async function fetchCustomer(id: string) {

        const res = await getAllCustomers(`?id=${id}`)

        setCustomer(res.customers[0])

    }

    useLayoutEffect(() => {

        fetchCustomer(id as string)

    }, [])

    return (
        <div className={Styles.container} data-loading={!customer ? true : false}>

            {customer ? (
                <>
                    <button role='link' type='button' onClick={() => navigate(-1)}>
                        <ArrowUp style={{ transform: 'rotate(270deg)', marginRight: '8px' }} /> Voltar
                    </button>

                    <h1>Cliente <span>{customer.name.first} {customer.name.last}</span></h1>

                    <div className={Styles.customer_data_container}>

                        <CustomerProfile props={customer} />

                    </div>

                    <nav id={Styles.links_container}>

                        <Link to={`/customers/update/${id}`} data-update>
                            <Update alt='Atualizar Cliente.' />
                            Atualiza Esse Perfil
                        </Link>

                        <Link to={`/customers/delete/${id}`} data-delete>
                            <RemoveUser alt='Deletar Cliente. Icon from https://thenounproject.com/shuaibtawfeeq/' />
                            Deletar Esse Perfil
                        </Link>

                    </nav>

                </>
            ) :
                (
                    <div id={Styles.loading} aria-busy="true" >
                        <Loading alt="Carregando..." />
                    </div>
                )
            }

        </div>
    )
}

export default Profile