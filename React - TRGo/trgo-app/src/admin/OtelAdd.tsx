import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavBar from '../components/AdminNavBar'
import NavBar from '../components/NavBar'
import { ILocation } from '../models/ILocation';
import { IPicture } from '../models/IPicture';
import { IPicturePreviev } from '../models/IPicturePreviev';
import { ITaxonomy } from '../models/ITaxonomy';
import { addOtel, addPicture, locationList, taxonomyList } from '../Service';


function OtelAdd() {

    const [picList, setPicList] = useState<IPicturePreviev[]>([]);
    const [arrTaxonomy, setArrTaxonomy] = useState<string[]>([]);

    const [taxonomy, setTaxonomy] = useState<ITaxonomy>()
    const [location, setLocation] = useState<ILocation>()

    const [locationId, setLocationId] = useState<string>()
    const [otelName, setOtelName] = useState<string>()
    const [star, setStar] = useState<string>()
    const [description, setDescription] = useState<string>()



    useEffect(() => {
        locationList().then(res => {
            const arr = res.data
            setLocation(arr)
        })

        taxonomyList().then(res => {
            const arr = res.data
            setTaxonomy(arr)

        })


    }, [])




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


    const arrTaxSet = (val: any, id: string) => {

        if (val.target.checked) {
            setArrTaxonomy(oldArray => [...oldArray, id]);
        } else {
            setArrTaxonomy(arrTaxonomy.filter(item => item !== id));
        }
    }

    const navigate = useNavigate();

    const fncAdd = (evt: React.FormEvent) => {
        evt.preventDefault()

        const myPic = picList.map(evt => {
            return { lid: evt.lid }
        })

        const myTax = arrTaxonomy.map(evt => {
            return { taxid: evt }
        })


        console.log("otelName", otelName)
        console.log("description", description)
        console.log("locationId", locationId)
        console.log("star", star)
        console.log("myPic", myPic)
        console.log("myTax", myTax)

        addOtel(otelName!, description!, locationId!, star!, myPic, myTax).then(res => {
            const status: any = res.data;
            toast.error("Başarılı")
            console.log(status)
            navigate('/admin/otel/list')
        }).catch(err => {
            toast.error("Hata")
        })

    }

    const goTo = (val: string) => {
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
                                    Otel Ekle
                                </a>
                                <div>
                                    <button type="button" onClick={() => goTo('/admin/room/add')} className="btn btn-success"><i className="bi bi-plus-lg" /> Oda Ekle</button>
                                    <button type="button" onClick={() => goTo('/admin/otel/list')} className="btn btn-primary"><i className="bi bi-plus-lg" /> Geri </button>
                                </div>
                            </nav>
                            <br />
                            <div className="row admin-info container">
                                <div className="p-3 border bg-light ">
                                    <form onSubmit={fncAdd}  >
                                        <div className="row admin-info container">
                                            <div className="row gx-3">
                                                <div className="col-8">
                                                    <div className="p-3 border bg-light ">
                                                        <div className="row">
                                                            <div className="col-md-9 mb-3">
                                                                <label htmlFor="otelName">Otel Adı</label>
                                                                <input type="text" onChange={(evt) => setOtelName(evt.target.value)} className="form-control" id="otelName" required />
                                                                <div className="invalid-feedback">
                                                                    Valid first name is required.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3 mb-3">
                                                                <label htmlFor="lastName">Yıldız</label>
                                                                <input type="number" onChange={(evt) => setStar(evt.target.value)} className="form-control" id="lastName" required />
                                                                <div className="invalid-feedback">
                                                                    Valid last name is required.
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <label htmlFor="country">Lokasyon</label>
                                                                <div className="form-group mb-2">
                                                                    <select className="form-select" value={locationId} onChange={e => { setLocationId(e.target.value); }} style={{ width: '100%' }} aria-label="Default select example">
                                                                        <>
                                                                            {
                                                                                location?.RESULT?.map((res, index) => {
                                                                                    return (
                                                                                        <option value={res.lid} selected>{res.city}/{res.district} ({res.count})</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </>
                                                                    </select>
                                                                </div>
                                                                <div className="invalid-feedback">
                                                                    Please select a valid country.
                                                                </div>
                                                            </div>
                                                            <div className="row container" style={{ overflow: 'hidden' }}>

                                                                <label htmlFor="country">İçerik</label>
                                                                <div className="form-group mb-2">
                                                                    <textarea style={{ width: '100%', overflow: 'hidden'}} onChange={(evt) => setDescription(evt.target.value)} id="editor" rows={10} defaultValue={""} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <button className="btn btn-primary btn-block" style={{ width: '100%' }} type="submit">Otel Ekle</button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-3 border bg-light ">

                                                        {picList.map((evt, i) => {
                                                            return <div className="imgPrev"><img src={evt.file} width="50" height="50"></img> <i>{evt.lid}</i></div>
                                                        })}

                                                        <div className="mb-3">
                                                            <label htmlFor="otelImage" className="form-label">Resim Ekle</label>
                                                            <input className="form-control" onChange={onChangeFile} type="file" id="otelImage" />
                                                        </div>
                                                        <hr />
                                                        <h4> Etiket </h4>
                                                        <div className="form-group">
                                                            <>
                                                                {
                                                                    taxonomy?.RESULT?.map((res, index) => {
                                                                        return (
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" onChange={e => arrTaxSet(e, res.taxid.toString())} type="checkbox" id={"tax-" + res.taxid} />
                                                                                <label className="form-check-label" htmlFor={"tax-" + res.taxid}>
                                                                                    {res.name} ({res.count})
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
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

export default OtelAdd