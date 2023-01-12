import React, { useLayoutEffect, useState } from 'react'
import Styles from './DeleteCustomer.module.css'
import { customerTypes, deleteCustomer, getAllCustomers } from '../../../api/customersMongoServer'
import { Params, useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'
import ArrowUp from '../../../img/icons/ChevronUp'
import { Link } from 'react-router-dom'
import Loading from '../../../img/icons/Loading200Px'
import CustomerProfile from '../../../Components/Customers/CustomerProfile'

function DeleteCustomer() {

  // gets the Customer ID from URL
  const { id }: Readonly<Params<string>> = useParams()

  const [customer, setCustomer] = useState<customerTypes>()

  const navigate = useNavigate()

  // Shows the server response to the user 
  function showServerResponse(res: { success: boolean, message: string }) {

    if (res.success) {
      return Swal.fire({
        title: 'Tudo Certo!',
        text: `${res.message || 'O cliente foi deletado com sucesso.'}`,
        icon: 'success',
        confirmButtonColor: 'var(--success)',
        confirmButtonText: 'Voltar para página Clientes',
        didClose: () => navigate('/customers')
      })
    }

    return Swal.fire({
      title: 'Um Erro Aconteceu!',
      text: `${res.message || ''}`,
      icon: 'error',
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Tentar Novamente'
    })

  }

  // submits delete customer profile request and sets a response with what server returns
  async function handleDeleteProfileButton() {

    Swal.fire({
      title: 'Tem Certeza?',
      text: 'O cliente será apagado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não, quero voltar.',
      cancelButtonColor: 'var(--secondary)',
      confirmButtonColor: 'var(--error)',
      confirmButtonText: 'Sim, quero deletar.',
      preConfirm: async () => {
        const res = await deleteCustomer(id as string)

        // Shows the server response to the user
        showServerResponse(res)
      },
      preDeny: () => {}
    })

  }

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
          <Link to='/customers'>
            <ArrowUp style={{ transform: 'rotate(270deg)', marginRight: '8px' }} /> Voltar
          </Link>

          <h1>Deletar <span>{customer!.name.first} {customer!.name.last}</span></h1>

          <p>Essa ação não pode ser desfeita. Tenha certeza de estar deletando a pessoa certa.</p>

          <div className={Styles.profile_container}>

            <CustomerProfile props={customer} />

            <div className={Styles.button_container}>

              <button type='button' onClick={() => handleDeleteProfileButton()}>
                Deletar {customer.name.first} {customer.name.last}
              </button>

            </div>

          </div >
        </>
      ) :
        (
          <div id={Styles.loading} aria-busy="true" >
            <Loading alt="Carregando..." />
          </div>
        )
      }

    </div >

  )
}

export default DeleteCustomer