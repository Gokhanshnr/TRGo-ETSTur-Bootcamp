import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AdminNavBar from '../components/AdminNavBar'
import NavBar from '../components/NavBar'
import { addLocation, locationDelete, locationList } from '../Service'
import { ILocation } from '../models/ILocation'
import { toast } from 'react-toastify'

function Location() {

    useEffect(() => {
        locList();
    }, [])

    const [location, setLocation] = useState<ILocation>()


    const locList = () => {
        locationList().then(res => {
            const arr = res.data
            setLocation(arr)
            console.log(location)
        })
    }


    const deleteItem = (id:number) => {
        locationDelete(id).then(res => {
            const arr = res.data
            setLocation(arr)
            toast.info("Başarıyla Silindi")
            locList();
        })
        }

        const [city, setCity] = useState('')
        const [district, setDistrict] = useState('')

        const fncLocAdd = (evt: React.FormEvent) => {
            evt.preventDefault()
           
                addLocation(city, district).then(res => {
                const status:any = res.data;
                toast.success(city + " Başarıyla Eklendi")
                locList();
            }).catch(error =>{
            toast.error("Bir hata oluştu")
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
                                <div className="col-7">
                                    <div className="p-3 border bg-light ">
                                        <table className="table admin-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">İsim</th>
                                                    <th scope="col" style={{ width: '35%' }}>İşlem</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <>
                                                    {
                                                        location?.RESULT?.map((res, index) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{++index}</th>
                                                                    <td>{res.city} {res.district} ({res.count})</td>
                                                                    <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                        <button type="button" className="btn btn-sm btn-primary"><i className="bi bi-arrow-clockwise" /> Güncelle</button>
                                                                        <button type="button" onClick={() => deleteItem(res.lid)} className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill" /> Sil</button>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        })
                                                    }

                                                </>
                                            </tbody>
                                        </table>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="p-3 border bg-light">
                                        <h3>Etiket Ekle</h3>
                                        <hr />
                                        <form onSubmit={fncLocAdd} >
                                            <div className="form-group">
                                                <label htmlFor="name">Şehir</label>
                                                <input type="text" onChange={(evt) => setCity(evt.target.value)} className="form-control" id="city" placeholder="Name ..." />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="district">İlçe</label>
                                                <input type="text" onChange={(evt) => setDistrict(evt.target.value)} className="form-control" id="district" placeholder="Description.." />
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Ekle</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
  )
}

Location.propTypes = {}

export default Location
