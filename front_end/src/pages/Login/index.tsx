import React, { FormEvent, useEffect } from 'react'
import Styles from './Login.module.css'
import { loginUser } from '../../redux/actions/userActions'
import { store } from '../../store'
import { useAppSelector } from '../../redux/hooks'
import Loading from '../../img/icons/Loading200Px'
import { useNavigate } from 'react-router'

function Login() {

    const usernameInput = React.useRef<HTMLInputElement>(null)
    const passwordInput = React.useRef<HTMLInputElement>(null)

    const user: any = useAppSelector((state) => state.adminUser)

    const navigate = useNavigate()

    // Dispach to redux user login info, then fetchs server info to verify if it matchs 
    function handleLoginForm(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()

        store.dispatch(loginUser(
            'login',
            {
                username: usernameInput.current!.value,
                password: passwordInput.current!.value
            }
        ))

    }

    useEffect(() => {

        // if user is logged in, he will be redirected to Home Page
        if (user.username && user.token) {

            navigate('/')

        }

    }, [user])

    return (
        <div className={Styles.container}>

            <div className={Styles.form_container}>

                <h1>Login</h1>

                <form onSubmit={(e) => handleLoginForm(e)}>

                    <div>
                        <label>
                            Nome de Usuário
                            <input type='text' placeholder='Username'
                                id={Styles.usernameInput} name='username'
                                ref={usernameInput}
                                // defaultValue='desafiosharenergy'
                            ></input>
                        </label>
                        <small>Ofericido pelo desafio.</small>
                    </div>
                    <div>
                        <label>
                            Senha
                            <input type='password' placeholder='Senha'
                                id={Styles.passwordInput} name='password'
                                ref={passwordInput}
                            // defaultValue='sh@r3n3rgy'
                            ></input>
                        </label>
                        <small>Ofericida pelo desafio.</small>
                    </div>

                    <button type='submit'
                        disabled={user.loading ? true : false}
                    >
                        {user.loading ? <Loading /> : 'Entrar'}
                    </button>

                    {!user.success && (
                        <small role='alert' id={Styles.error_message}>
                            {user.message}
                        </small>
                    )}
                </form>

            </div>
        </div >
    )

}

export default Login