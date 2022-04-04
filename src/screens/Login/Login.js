import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'
import { useFetchAPI } from 'hooks/useFetchAPI'

const Login = props => {
    const { fetchAPI } = useFetchAPI()

    let history = useHistory()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [errorMessage, setError] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        let option = {
            method: 'POST',
            body: {
                email,
                password,
            },
        }
        let res = await fetchAPI(`/auth/login`, option)
        if (res.success) {
            props.setUser(res.user)
            history.push('/admin/portfolio')
        } else {
            setError(res.errors.message)
        }
    }

    return (
        <div className="box-centered">
            <form className="vertical-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    className="input"
                    id="email"
                    value={email}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    id="password"
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <input className="button" type="submit" value="Login" />
            </form>
            {errorMessage && <h4 className="error-message">{errorMessage}</h4>}
        </div>
    )
}

export default Login
