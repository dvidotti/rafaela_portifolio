import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetchAPI } from 'hooks/useFetchAPI'

import "./SignUp.css"

const SignUp = () => {
  const { fetchAPI } = useFetchAPI()

  let history = useHistory()
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [secret, setSecret] = useState("")
  let [errorMessage, setError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const options = {
      body : {
        email, password, secret
      },
      method: "POST"
    }

    let user = await fetchAPI(`/auth/signup`, options)
    if(user.success) {
      history.push('/login')
    } else {
      setError(user.message)
    }
  }

  return (
    <div className="box-centered">
      <form className="vertical-form" onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
          <input 
            className="input"
            id='email' 
            value={email} 
            type='text'
            onChange={(e) => setEmail(e.target.value)}
          />
        <label htmlFor='password'>Password</label>
          <input
            className="input"
            id="password"
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        <label htmlFor='secret'>Secret</label>
          <input 
            className="input"
            id="secret" 
            type='password' 
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          {errorMessage &&
            <h4 className='error-message'>{errorMessage}</h4>
          }

        <input className="button" type="submit" value="Sign Up"/>
      </form>
    </div>
  )
}

export default SignUp;