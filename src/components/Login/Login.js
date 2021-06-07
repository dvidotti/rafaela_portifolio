import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "./Login.css"
const apiUrl  = process.env.REACT_APP_API_URL;
// let myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");


const Login = () => {
  let history = useHistory()
  let [email, handleEmail] = useState("")
  let [password, handlePassword] = useState("")
  let [errorMessage, handleError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    let body = {
      email, password
    }
    body = JSON.stringify(body);
    let response = await fetch(`${apiUrl}/auth/login`, {
      method:"POST",
      body: body,
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      }),
      mode: 'cors',
    })
    const user = await response.json()
    console.log("RESPONSE=====>", user)
    if(user.success) {
      history.push('/')
    } else {
      handleError(user.message)
    }
    console.log("User", user)
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
            onChange={(e) => handleEmail(e.target.value)}
          />
        <label htmlFor='password'>Password</label>
          <input
            className="input"
            id="password"
            value={password}
            type='password'
            onChange={(e) => handlePassword(e.target.value)}
          />
          {errorMessage &&
            <h4 className='error-message'>{errorMessage}</h4>
          }

        <input className="button" type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login;