import React from 'react'
import Styles from './CustomerResult.module.css'
import { Link } from 'react-router-dom'
import convertDate from '../convertDate'

interface customerTypes {
    name: {
        first: string,
        last: string
    },
    address: {
        street: string,
        county: string,
        state: string,
        country: string
    }
    email: string,
    password: string,
    tel: string[],
    cpf: string,
    _id: string,
    createdAt: Date
}


function CustomerResult({ props }: { props: customerTypes }) {

    return (
        <li className={Styles.container}>
            <Link to={props._id}>

                <div className={Styles.card_heading}>

                    <div className={Styles.card_user_name}>

                        <div className={Styles.card_user_name_age}>
                            <h3>
                                {`${props.name.first} ${props.name.last}`}
                            </h3>
                        </div>

                        <p>{props.email}</p>
                    </div>

                </div>

                <div className={Styles.more_info}>

                    <address>{props.address.county}, {props.address.country}</address>

                    <small>Desde {convertDate(props.createdAt)}</small>

                </div>
            </Link>
        </li>
    )

}

export default CustomerResult