import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar'
import NavBar from '../components/NavBar'
import { ILocation } from '../models/ILocation';
import { IPicturePreviev } from '../models/IPicturePreviev';
import { IProductSimple } from '../models/IProductSimple';
import { ITaxonomy } from '../models/ITaxonomy';
import { addOtel, addPicture, addRoom, getOtelList, locationList, taxonomyList } from '../Service';

function RoomAdd() {

    const [picList, setPicList] = useState<IPicturePreviev[]>([]);
    const [productList, setProductList] = useState<IProductSimple>()
    

    const [otelId, setOtelId] = useState<string>()
    const [roomName, setRoomName] = useState<string>()
    const [roomQty, setRoomQty] = useState<string>()
    const [bed, setBed] = useState<string>()
    const [price, setPrice] = useState<string>()
    const [description, setDescription] = useState<string>()

    

    useEffect(() => {
  
      fncOrderList();
  
  
    }, [])
  
    const fncOrderList = () => {
      getOtelList().then(res => {
        const arr = res.data
        setProductList(arr);
        
      })
    }






    const onChangeFile = (evt: any) => {
        if (evt.target.files.length < 1) {
            return;
        }

        for (let i = 0; i < evt.target.files.length; i++) {
            const file = evt.target.files[i];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const type = file.type
                if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
                    if (file.size < 1000000) {
                        addPicture(fileReader.result as string).then(res => {

                            setPicList(oldArray => [...oldArray, res.data.result]);

                        })
                    } else {
                        alert("Dosya Boyutu 1mb olmalıdır")
                    }
                }
            }
            fileReader.readAsDataURL(file);
        }
    }



    const navigate = useNavigate();

    const fncAdd = (evt: React.FormEvent) => {
        evt.preventDefault()

        const myPic = picList.map(evt => {
            return { lid: evt.lid }
        })

        try {
            addRoom(roomName!, description!, bed!, price!, myPic,otelId!,roomQty! ).then(res => {
                const status: any = res.data;
                console.log(status.STATUS)
                navigate('/admin/otel/list')
            })
        } catch {
            console.log("Hata")
        }

    }


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
                                    Oda Ekle
                                </a>
                                <div>
                                    <button type="button" onClick={() => goTo('/admin/otel/add')}  className="btn btn-success"><i className="bi bi-plus-lg" /> Otel Ekle</button>
                                    <button type="button" onClick={() => goTo('/admin/otel/list')}  className="btn btn-primary"><i className="bi bi-plus-lg" /> Geri </button>
                                </div>
                            </nav>
                            <br />
                            <div className="row admin-info container">
                                <div className="p-3 border bg-light ">
                                    <form onSubmit={fncAdd} >
                                        <div className="row admin-info container">
                                            <div className="row gx-3">
                                                <div className="col-8">
                                                    <div className="p-3 border bg-light ">
                                                        <div className="row">
                                                            <div className="row">
                                                                <label htmlFor="country">Otel</label>
                                                                <div className="form-group mb-2">
                                                                    <select className="form-select" value={otelId} onChange={e => { setOtelId(e.target.value); }} style={{ width: '100%' }} aria-label="Default select example">
                                                                        {
                                                                        productList?.RESULT.map(evt => {
                                                                            return <option value={evt.pid}>{evt.otelName} ( {evt.rooms} )</option>
                                                                        })
                                                                       }
                                                                    </select>
                                                                </div>
                                                                <div className="invalid-feedback">
                                                                    Please select a valid country.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-9 mb-3">
                                                                <label htmlFor="roomName">Oda Adı</label>
                                                                <input onChange={(evt) => setRoomName(evt.target.value)} type="text" className="form-control" id="roomName" required />
                                                                <div className="invalid-feedback">
                                                                    Valid first name is required.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 mb-3">
                                                                <label htmlFor="quantity">Oda Sayısı</label>
                                                                <input type="number" onChange={(evt) => setRoomQty(evt.target.value)} className="form-control" id="quantity" required />
                                                                <div className="invalid-feedback">
                                                                    Valid last name is required.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label htmlFor="bed">Yatak Satısı</label>
                                                                <input type="number" onChange={(evt) => setBed(evt.target.value)} className="form-control" id="bed" required />
                                                                <div className="invalid-feedback">
                                                                    Valid last name is required.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label htmlFor="price">Fiyat (TL)</label>
                                                                <input type="number" onChange={(evt) => setPrice(evt.target.value)} className="form-control" id="price" required />
                                                                <div className="invalid-feedback">
                                                                    Valid last name is required.
                                                                </div>
                                                            </div>
                                                            <div className="row container" style={{ overflow: 'hidden' }}>
                                                                <label htmlFor="country">İçerik</label>
                                                                <textarea onChange={(evt) => setDescription(evt.target.value)} rows={10} style={{ width: '100%', overflow: 'hidden', marginLeft: '12.3px'}} id="editor" defaultValue={""} />
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <button className="btn btn-primary btn-block" style={{ width: '100%' }} type="submit">Otel Ekle</button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-3 border bg-light ">
                                                        {picList.map((evt, i) => {
                                                            return <li><img src={evt.file} width="50" height="50"></img> <i>{evt.lid}</i></li>
                                                        })}
                                                        <div className="mb-3">
                                                            <label htmlFor="roomImage" className="form-label">Resim Ekle</label>
                                                            <input onChange={onChangeFile} className="form-control" type="file" id="roomImage" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RoomAdd