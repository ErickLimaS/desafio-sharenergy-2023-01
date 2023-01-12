import React from 'react'
import { customerTypes } from '../../../api/customersMongoServer'
import Styles from './CustomerProfile.module.css'

function CustomerProfile({ props }: { props: customerTypes }) {

    return (
        <ul className={Styles.container}>

            <li><span>Nome</span> {props.name.first} {props.name.last}</li>
            <li><span>CPF</span> {props.cpf.slice(0, 3)}.{props.cpf.slice(3, 6)}.{props.cpf.slice(6, 9)}-{props.cpf.slice(9, 11)}</li>
            <li><span>Email</span> {props.email} </li>
            <li><span>Telefone</span> ({props.tel[0].ddd}) {props.tel[0].tel.slice(0, props.tel[0].tel.length - 4)}-{props.tel[0].tel.slice(props.tel[0].tel.length - 4)}</li>
            <li>
                <span>Endereço</span>
                <ul id={Styles.address_list}>
                    <li><span>Rua</span> {props.address.street}</li>
                    <li><span>Bairro</span> {props.address.county}</li>
                    <li><span>Estado</span> {props.address.state}</li>
                    <li><span>País</span> {props.address.country}</li>
                </ul>
            </li>

        </ul>
    )

}

export default CustomerProfile