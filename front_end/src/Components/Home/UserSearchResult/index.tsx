import React from 'react'

interface UserTypes {

  email: string,
  picture: {
    medium: string,
    thumnail: string
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
    <li>


      <img
        src={props.picture.medium}
        alt={`${props.name.title} ${props.name.first} ${props.name.last}`}
      >
      </img>

      <div>

        <h3>
          {`${props.name.title} ${props.name.first} ${props.name.last}`}
          {' '}
          <span>{props.dob.age}</span>
        </h3>

        <p>{props.login.username}</p>

        <p>{props.email}</p>

      </div>

    </li>
  )
}

export default UserSearchResult