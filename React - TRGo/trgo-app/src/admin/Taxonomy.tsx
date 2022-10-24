import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar'
import { ITaxonomy } from '../models/ITaxonomy'
import { addTaxonomy, taxonomyDelete, taxonomyList } from '../Service'
import { toast } from 'react-toastify'

function Taxonomy() {

    const [taxonomy, setTaxonomy] = useState<ITaxonomy>()




    useEffect(() => {
        taxList();
    }, [])

    const taxList = () => {
        taxonomyList().then(res => {
            const arr = res.data
            setTaxonomy(arr)
        })
    }


    const deleteItem = (id: number) => {
        taxonomyDelete(id).then(res => {
            const arr = res.data
            setTaxonomy(arr)
            toast.error("Başarıyla Silindi")
            taxList();
        })
    }



    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const fncTaxAdd = (evt: React.FormEvent) => {
        evt.preventDefault()

        addTaxonomy(name, description).then(res => {
            const status: any = res.data;
            toast.success(name + " Başarıyla Eklendi")
            setDescription("");
            setName("");
            taxList();
        }).catch(error => {
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
                                                        taxonomy?.RESULT?.map((res, index) => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row">{++index}</th>
                                                                    <td>{res.name} ({res.count})</td>
                                                                    <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                        <button type="button" className="btn btn-sm btn-primary"><i className="bi bi-arrow-clockwise" /> Güncelle</button>
                                                                        <button type="button" onClick={() => deleteItem(res.taxid)} className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill" /> Sil</button>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        })
                                                    }

                                                </>
                                            </tbody>
                                        </table>
                                    
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="p-3 border bg-light">
                                        <h3>Etiket Ekle</h3>
                                        <hr />
                                        <form onSubmit={fncTaxAdd}  >
                                            <div className="form-group">
                                                <label htmlFor="name">Etiket Adı</label>
                                                <input type="text" value={name} className="form-control" onChange={(evt) => setName(evt.target.value)} id="name" placeholder="Name ..." />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="desc">Etiket Detay</label>
                                                <input type="text" value={description} className="form-control" onChange={(evt) => setDescription(evt.target.value)} id="desc" placeholder="Description.." />
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

Taxonomy.propTypes = {}

export default Taxonomy
