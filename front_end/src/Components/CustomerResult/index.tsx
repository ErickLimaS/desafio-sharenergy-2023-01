import React from 'react'
import Styles from './CustomerResult.module.css'
import { Link } from 'react-router-dom'
import convertDate from '../convertDate'
import { customerTypes } from '../../api/customersMongoServer'

function CustomerResult({ props }: { props: customerTypes }) {

    return (
        <li className={Styles.container}>
            <Link to={props._id as string}>

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

                    <small>Desde {convertDate(props.createdAt as Date)}</small>

                </div>
            </Link>
        </li>
    )

}

export default CustomerResult