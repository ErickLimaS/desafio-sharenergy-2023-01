import React from 'react'
import Styles from './UserSearchResult.module.css'

interface UserTypes {

  email: string,
  picture: {
    medium: string,
    thumbnail: string
  },
  name: {
    title: string,
    first: string,
    last: string
  },
  login: {
    username: string
  },
  dob: {
    age: number
  }

}

function UserSearchResult({ props }: { props: UserTypes }) {

  return (
    <li className={Styles.container}>

      <div className={Styles.card_heading}>

        <img
          src={props.picture.thumbnail}
          width='46px' height='auto'
          alt={`${props.name.title} ${props.name.first} ${props.name.last}`}
        >
        </img>

        <div className={Styles.card_user_info}>

          <div className={Styles.card_user_name_age}>
            <h3>
              <span>{props.name.title}</span> {`${props.name.first} ${props.name.last}`}
            </h3>

            <span>{props.dob.age}</span>
          </div>

          <p>@{props.login.username}</p>

          <p>{props.email}</p>
          
        </div>

      </div>
{/* 
      <div className={Styles.more_info}>


      </div> */}

    </li>
  )
}

export default UserSearchResult