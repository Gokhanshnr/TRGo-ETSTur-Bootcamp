import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar'
import { IUserList } from '../models/IUserList'
import { getUserList } from '../Service'

function Users() {



    const [userList, setUserList] = useState<IUserList>()

    useEffect(() => {
        fncUserList();
    }, [])

    const fncUserList = () => {
        getUserList().then(res => {
            const arr = res.data
            setUserList(arr);
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
                        <div>
                            <br />
                            <div className="row admin-info container">
                                <div className="p-3 border bg-light ">
                                    <table className="table admin-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#id</th>
                                                <th scope="col">İsim</th>
                                                <th scope="col">Soyisim</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col" style={{ width: '190px' }}>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userList?.RESULT.map((evt, i) => {
                                                    return <tr>
                                                    <th scope="row">{evt.id}</th>
                                                    <td>{evt.first_name}</td>
                                                    <td>{evt.last_name}</td>
                                                    <td>{evt.email}</td>
                                                    <td><span className="badge badge-success">Customer</span></td>
                                                    <td>
                                                        <button type="button" className="btn btn-sm btn-primary"><i className="bi bi-arrow-clockwise" /> Güncelle</button>
                                                        <button type="button" className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill" /> Sil</button>
                                                    </td>
                                                </tr>

                                                })
                                            }
                                           
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

Users.propTypes = {}

export default Users
