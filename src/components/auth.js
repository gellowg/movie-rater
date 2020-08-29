import React, { useState, useEffect } from "react";
import API from '../api-service'
import { useCookies } from "react-cookie";

function Auth(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginView, setIsLoginView] = useState(true)


    const [token, setToken] = useCookies(['user-token']);

    useEffect( () => {
        console.log(token.token)
        if(token['user-token']) window.location.href = '/movies';
    },[token])


    const loginClicked = () => {
        API.loginUser({username, password})
            .then( resp => checkAuth(resp))
            .then(resp => console.log(resp))
            .then( resp => setToken('user-token', resp.token))
    }

    const checkAuth = (resp) => {
        if (resp.token === 'undefined') {
            console.log('username or password incorrect')
        }else {
            setToken('user-token', resp.token)
        }
    }

    const registerClicked = () => {
        API.registerUser({username, password})
            .then(() => loginClicked())
    }



    return (
        <div className="App">
    <div className="LoginForm">

        {isLoginView ? <h1 className={'heading'}>Login</h1> :
            <h1 className={'heading'}>Sign Up</h1>}



            <label htmlFor="username">Username</label> <br/>
        <input id={"username"} type="text" placeholder="Username" value={username} onChange={ evt=> setUsername(evt.target.value)} /> <br/><br/>



        <label htmlFor="password">Password</label> <br/>
        <input id="password" type="password" placeholder="Password" value={password} onChange={ evt=> setPassword(evt.target.value)} /> <br/>


        {isLoginView ? <button onClick={loginClicked}>Login</button> : <button onClick={registerClicked}>Sign Up</button> }

        {/*{ ? <p>Username or Password Incorrect.</p> : null}*/}

        {isLoginView ? <p>Don't have an account? <br/> <a className={'signUpHere'} onClick={() => setIsLoginView(false)}>Sign up here.</a></p> :
            <p>Have an account? <br/> <a className={'signUpHere'} onClick={() => setIsLoginView(true)}>Log in here.</a></p>}

        </div>
        </div>
                )


}

export default Auth;