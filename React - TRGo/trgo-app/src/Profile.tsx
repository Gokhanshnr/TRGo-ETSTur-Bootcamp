import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import { control } from './util'
import { IUser } from './models/IUser'
import { getUser, updatePassword, updateUser } from './Service'
import { toast } from 'react-toastify'


function Profile() {
    const [user, setUser] = useState<IUser>()
    const [name, setName] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [oldPass, setOldPass] = useState<string>()
    const [newPass, setNewPass] = useState<string>()
    const [newPassR, setNewPassR] = useState<string>()

    useEffect(() => {

        getUser(control()!.RESULT?.username + "").then(res => {
            const arr = res.data
            setUser(user)
            setName(arr?.RESULT.first_name);
            setLastname(arr?.RESULT.last_name)
            setEmail(arr?.RESULT.email);


        })
    }, [])

    const fncUpdateProfile = (evt: React.FormEvent) => {
        evt.preventDefault()
        try {
            updateUser(name!, lastname!, email!).then(res => {
                const status: any = res.data;
                console.log(status.STATUS)
                toast.success("Güncellendi");
            })
        } catch {
            toast.error("Hata Oluştu")
        }

    }


    const fncUpdatePassword = (evt: React.FormEvent) => {
        evt.preventDefault()
        if (newPass == newPassR) {
            try {
                updatePassword(oldPass!, newPass!).then(res => {
                    const status: any = res.data;
                    console.log(status.STATUS)
                    toast.success("Güncellendi")
                })
            } catch {
                toast.error("Hata Oluştu")
            }
        }else{
            toast.error("Şifreler birbiriyle uyuşmamaktadır")
        }

    }



    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <br />
                <div className="card bg-light ">
                    <div className="card-header">
                        <h3>Profil</h3>
                    </div>
                    <div className="card-body row">
                        <div className="col-4 text-center" style={{ borderRight: '2px solid rgb(240 241 242)' }}>
                            <img className="rounded " width="245px" src="/img/profile_img.jpg" alt="Profile image" />
                            <hr />
                            <div className="mb-3">
                                <label htmlFor="formFile">Profil Resmi</label>
                                <input className="form-control" type="file" id="formFile"  disabled/>
                            </div>
                        </div>
                        <div className="col-8 mb-4">
                            <h4 className="mb-3">{name} {lastname}</h4>
                            <form onSubmit={fncUpdateProfile} >
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" onChange={(evt) => setName(evt.target.value)} value={name} required />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" onChange={(evt) => setLastname(evt.target.value)} value={lastname} required />
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username">Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input type="text" className="form-control" id="username" value={email} required disabled />
                                        <div className="invalid-feedback" style={{ width: '100%' }}>
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Güncelle</button>
                                </div>
                            </form>
                            <hr />
                            <div>
                                <form  onSubmit={fncUpdatePassword}  >
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="firstName">Eski Şifre</label>
                                            <input type="password" className="form-control" onChange={(evt) => setOldPass(evt.target.value)} id="firstName" required />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="lastName">Yeni Şifre</label>
                                            <input type="password" className="form-control" onChange={(evt) => setNewPass(evt.target.value)} id="lastName" required />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="lastName">Yeni Şifre Tekrar</label>
                                            <input type="password" className="form-control" onChange={(evt) => setNewPassR(evt.target.value)} id="lastName" required />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-secondary " type="submit">Şifre Güncelle</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

Profile.propTypes = {}

export default Profile
