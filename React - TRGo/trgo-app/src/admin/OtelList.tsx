import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenSourceMapRange } from 'typescript'
import AdminNavBar from '../components/AdminNavBar'
import NavBar from '../components/NavBar'
import { IProductSimple } from '../models/IProductSimple'
import { getOtelList } from '../Service'

function OtelList() {


  const [productList, setProductList] = useState<IProductSimple>()

  useEffect(() => {

    fncOrderList();


  }, [])

  const fncOrderList = () => {
    getOtelList().then(res => {
      const arr = res.data
      setProductList(arr);
      
    })
  }

  const navigate = useNavigate();

  const goTo = (val:string) => {
    navigate(val)
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
              <nav className="navbar navbar-light bg-light" style={{ padding: '5px 15px' }}>
                <a className="navbar-brand" href="#">
                  <i className="bi bi-person-fill" style={{ fontSize: '25px' }} />
                  Oda Listesi
                </a>
                <div>
                  <button type="button" onClick={() => goTo('/admin/room/add')}  className="btn btn-success"><i className="bi bi-plus-lg" /> Oda Ekle</button>
                  <button type="button" onClick={() => goTo('/admin/otel/add')} className="btn btn-primary"><i className="bi bi-plus-lg" /> Otel Ekle</button>
                </div>
              </nav>
              <br />
              <div className="row admin-info container">
                <div className="p-3 border bg-light ">
                  <table className="table admin-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Otel Adı</th>
                        <th scope="col">Oda Sayısı</th>
                        <th scope="col">Lokasyon</th>
                        <th scope="col">Yıldız</th>
                        <th scope="col" style={{ width: '190px' }}>İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      { productList?.RESULT.map((evt,i) => {
                        return <tr>
                        <th scope="row">{evt.pid}</th>
                        <td>{evt.otelName}</td>
                        <td>{evt.rooms}</td>
                        <td>{evt.location}</td>
                        <td><span className="badge badge-yellow">{evt.starRatings}</span></td>
                        <td>
                          <button type="button" className="btn btn-sm btn-primary"><i className="bi bi-arrow-clockwise" /> Güncelle</button>
                          <button type="button" className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill" /> Sil</button>
                        </td>
                      </tr>

                      }) }
                      
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
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default OtelList