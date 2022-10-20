import PropTypes from 'prop-types'
import React, { Component, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { customerRegister, userLogin } from './Service';
import NavBar from './components/NavBar';

function Member() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [loginMessage, setloginMessage] = useState('')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [passwordI, setPasswordI] = useState('')
    const [emailI, setEmailI] = useState('')


    const navigate = useNavigate();

    const fncSend = (evt: React.FormEvent) => {
        evt.preventDefault()


        userLogin(email, password).then(res => {
            const status = res.data.STATUS

            if (status) {
                const jwt = res.data.JWT
                const stData = JSON.stringify(res.data!)
                const stJwt = JSON.stringify(jwt)
                console.log(stJwt)
                sessionStorage.setItem("jwt", stJwt)
                sessionStorage.setItem("data", stData)
                setLoginError(false)
                toast.success("Hoşgeldin "+email )
                navigate('/')
            }

        }).catch(error => {

            const err = error as AxiosError
            console.log(error)
            toast.error("Username or Password Fail!")
        });

    }

    const fncRes = (evt: React.FormEvent) => {
        evt.preventDefault()
        
        customerRegister(name, surname, emailI, passwordI).then(res => {
            const status:any = res.data;
            if(status.STATUS){
                toast.success("Kullanıcı başarılı bir şekilde oluşturuldu")
                
            }else{
               
                toast.error("Kullanıcı adınız başka biri tarafıdan kullanılıyor")
            }
        }).catch(error => {

            const err = error as AxiosError
            console.log(error)
            toast.error(error.message)
        });

        
    }
    

    return (
        <>
            <NavBar />
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-sm" style={{ borderRight: '2px solid #4b7a94' }}>
                            <div style={{ margin: '15%', textAlign: 'center' }}>
                                <form onSubmit={fncSend} className="form-signin">
                                    <img className="mb-4" src="./img/profile.jpg" alt="" width={72} height={72} />
                                    <h1 className="h3 mb-3 font-weight-normal">Üye Girişi</h1>
                                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                                    <input onChange={(evt) => setEmail(evt.target.value)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                                    <input onChange={(evt) => setPassword(evt.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                    <div className="checkbox mb-3">
                                        <label>
                                            <input type="checkbox" defaultValue="remember-me" /> Remember me
                                        </label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Giriş Yap</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div style={{ margin: '15%', textAlign: 'center' }}>
                                <form id='formlogin' onSubmit={fncRes} >
                                    
                                        <img className="mb-4" src="./img/profile.jpg" alt="" width={72} height={72} />
                                        <h1 className="h3 mb-3 font-weight-normal">Üye Olun</h1>
                                        <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="firstName">First name</label>
                                            <input type="text" onChange={(evt) => setName(evt.target.value)} className="form-control" id="firstName" required />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName">Last name</label>
                                            <input type="text" onChange={(evt) => setSurname(evt.target.value)} className="form-control" id="lastName" required />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                        <input type="email" onChange={(evt) => setEmailI(evt.target.value)} className="form-control" id="email" placeholder="you@example.com" />
                                        <div className="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" onChange={(evt) => setPasswordI(evt.target.value)} className="form-control" id="password" placeholder="1234 Main St" required />
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Üye Ol</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )

}

export default Member