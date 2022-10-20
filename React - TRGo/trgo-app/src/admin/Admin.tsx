import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar'
import { getTotal } from '../Service'
import { ITotal } from '../models/ITotal'

function Admin() {

    const [total, setTotal] = useState<ITotal>()

    useEffect(() => {

        fncOrderList();

       
    }, [])

    const fncOrderList = () => {
        getTotal().then(res => {
            const arr = res.data
            setTotal(arr);
        })
    }

    return (
        <>
            <NavBar></NavBar>
            <div className='container'>
                <br></br>
                <div className="row">
                    <div className="col-3">
                        <AdminNavBar></AdminNavBar>
                    </div>
                    <div className="col-9">
                        <div className="row admin-info">
                            <div className="row gx-3">
                                <div className="col ">
                                    <div className="p-3 border bg-light admin-card">
                                        <h4><i className="bi bi-people-fill" /> Toplam Üye</h4>
                                        <p> {total?.RESULT.user_count}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border bg-light admin-card">
                                        <h4><i className="bi bi-basket3-fill" /> Toplam Sipariş Adeti</h4>
                                        <p> {total?.RESULT.order_count}</p></div>
                                </div>
                                <div className="col">
                                    <div className="p-3 border bg-light admin-card gradient-bg">
                                        <h4><i className="bi bi-cash-stack" /> Toplam Kazanç</h4>
                                        <p> {total?.RESULT.total_earn} TL</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )


}


export default Admin
