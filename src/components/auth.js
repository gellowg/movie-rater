import React, { useState, useEffect } from "react";
import API from '../api-service'
import { useCookies } from "react-cookie";
import {Helmet} from "react-helmet";

function Auth() {

    //TO USE PROPS ADD PROPS TO AUTH BRACKETS ABOVE!!!!

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginView, setIsLoginView] = useState(true)
    const [userError, setUserError] = useState(false)
    const [regError, setRegError] = useState(false)


    const [token, setToken] = useCookies(['user-token']);

        useEffect(() => {
            if (token['user-token']) console.log(token['user-token'])
            if (token['user-token']) window.location.href = '/movies';
        },[token])



    const loginClicked = () => {
        API.loginUser({username, password})
            .then(resp => checkToken(resp))
    }

    const checkToken = resp => {
            if (resp.token) {
                setToken('user-token', resp.token)
            }else {
                setUserError(true)
            }
    }



    const registerClicked = () => {
        API.registerUser({username, password})
            //.then(() => checkReg())
            .then(resp => checkReg(resp))
    }

    const checkReg = (resp) => {
        if (!resp.id) {
            setRegError(true)
            console.log('nope')
        }else {
            loginClicked()
        }
    }

    useEffect(() => {
        if (isLoginView) {
            setRegError(false)
        }else {
            setUserError(false)
        }
    }, [isLoginView])


    return (
        <div className="App">
            <Helmet>
                <meta charSet="utf-8" name="apple-itunes-app" content="app-id=1531619429" />
            </Helmet>
    <div className="LoginForm">

        {isLoginView ? <h1 className={'heading'}>Login</h1> :
            <h1 className={'heading'}>Sign Up</h1>}



            <label htmlFor="username">Username</label> <br/>
        <input id={"username"} type="text" placeholder="Username" value={username} onChange={ evt=> setUsername(evt.target.value)} /> <br/><br/>



        <label htmlFor="password">Password</label> <br/>
        <input id="password" type="password" placeholder="Password" value={password} onChange={ evt=> setPassword(evt.target.value)} /> <br/>


        {regError ? <p style={{color: "red"}}>A user with that <br/>name already exists.</p> : null}
        { userError ? <p style={{color: "red"}}>Username or<br/> Password Incorrect.</p> : null}

        {isLoginView ? <button onClick={loginClicked} >Login</button> : <button onClick={registerClicked}>Sign Up</button> }


        {isLoginView ? <p>Don't have an account? <br/> <a href={'/#'} className={'signUpHere'} onClick={() => setIsLoginView(false)}>Sign up here.</a></p> :
            <p>Have an account? <br/> <a href={'/#'} className={'signUpHere'} onClick={() => setIsLoginView(true)}>Log in here.</a></p>}

        </div>
        </div>
                )


}

export default Auth;