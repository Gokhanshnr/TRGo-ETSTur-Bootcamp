import React, { Component } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { control } from '../util'
import 'react-toastify/dist/ReactToastify.css';


function NavBar() {

  const navigate = useNavigate() 

  const fncLogout = () =>  {
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('data')
    navigate('/')
  }

  let isAdmin = false

  control()?.RESULT?.authorities.forEach(e => {
    if(e.authority == "ROLE_admin"){ isAdmin = true; }
  })




  return (
    <header className="p-3" style={{ backgroundColor: "#275065", backgroundImage: 'linear-gradient(46deg, #8eabba, transparent)' }} >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src="/img/travel_logo.png" width={38} height={38} style={{ marginRight: '20px' }} />
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><NavLink to="/" className="nav-link px-2 text-white">Anasayfa</NavLink></li>
            <li><NavLink to="/list" className="nav-link px-2 text-white">Oteller</NavLink></li>
            <li><NavLink to="#" className="nav-link px-2 text-white">Fırsatlar</NavLink></li>
            <li><NavLink to="#" className="nav-link px-2 text-white">Hakkımızda</NavLink></li>
          </ul>
          {control()?.RESULT == null ?
            <div className="text-end" style={{ display: 'flex' }}>
              <NavLink to='/member' className="nav-link"><button type="button" className="btn btn-outline-light me-2">Login</button></NavLink>
              <NavLink to='/member' className="nav-link"><button type="button" className="btn btn-light">Sign-up</button></NavLink>
            </div>
            :
            <div className="dropdown text-end">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/img/profile_img.jpg" alt="mdo" width={40} height={40} className="rounded-circle" />
              </a>
              <ul className="dropdown-menu text-small">
                { (isAdmin) && <li><NavLink to='/admin' className="dropdown-item" >Dashboard</NavLink></li> }
                <li><NavLink to='/siparisler' className="dropdown-item" >Siparişlerim</NavLink></li>
                <li><NavLink to='/profil' className="dropdown-item" >Profil</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" onClick={ fncLogout }  >Çıkış Yap</a></li>
              </ul>
            </div>
            }

        </div>
      </div>
      <ToastContainer />
    </header>
  )

}

export default NavBar