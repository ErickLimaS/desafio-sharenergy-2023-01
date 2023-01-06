import React from 'react'
import Styles from './Customers.module.css'

function Customers() {
    return (
        <div className={Styles.container}>
            <h1>Clientes</h1>
            <p>
                Em uma quarta página, deve haver uma lista de clientes, através da qual o usuário deve ser capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, telefone, endereço e cpf.

            </p>
        </div>
    )
}

export default Customers