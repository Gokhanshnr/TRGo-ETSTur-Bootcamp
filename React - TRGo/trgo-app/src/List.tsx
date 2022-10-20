import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import { locationList, productList, taxonomyList } from './Service'
import { ITaxonomy } from './models/ITaxonomy'
import { ILocation } from './models/ILocation'
import { IProduct } from './models/IProduct'
import { NavLink } from 'react-router-dom'
import { setStDate, stDate } from './util'
import { IUser } from './models/IUser'
import { IDate } from './models/IDate'
import { toast } from 'react-toastify'


function List() {

    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [person, setPerson] = useState<number>(2)

    const [bookDate, setBookDate] = useState<IDate>()


    useEffect(() => {
        console.log(stDate())
        if(stDate() != null){
            console.log(" çalıştı")
            const myStDate:IDate = stDate() as IDate;
            setBookDate(myStDate)
            setStartDate(new Date(myStDate.startDate!));
            setEndDate(new Date(myStDate.endDate!));
            setPerson(myStDate.person!)
        }else{
            console.log("Else çalıştı")
            const date = new Date()
            date.setDate(date.getDate() + 1);
            setEndDate(date)
            setStDate(startDate!, endDate!, person!)
            setBookDate(stDate()!)
        }


        taxList();
        locList();
        proList();
    }, [])

    const [taxonomy, setTaxonomy] = useState<ITaxonomy>()

    const taxList = () => {
        taxonomyList().then(res => {
            const arr = res.data
            setTaxonomy(arr)

        })
    }

    const [location, setLocation] = useState<ILocation>()


    const locList = () => {
        locationList().then(res => {
            const arr = res.data
            setLocation(arr)

        })
    }

    const [product, setProduct] = useState<IProduct>()

    const proList = () => {
        productList().then(res => {
            const arr = res.data
            setProduct(arr)
        })
    }


    const fncGetDay = () => {

        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const  myStartDate = bookDate?.startDate;
        const myEndDate = bookDate?.endDate;
        const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
       
    }


    const fncStDateForm = (evt: React.FormEvent) => {
        evt.preventDefault()
    
        setStDate(startDate!, endDate!, person!)
        toast.success(fncGetDay()+" Gün "+ person +" kişi olarak güncellendi" )
      }


    return (
        <>
            <NavBar></NavBar>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <div className="sidebar">
                                <h3>Plan</h3>
                                <hr />
                                <form onSubmit={fncStDateForm}>
                                    <div className="sidebar-date-group">
                                        <div className="form-group mb-2" style={{width: '125px'}}>
                                            <label htmlFor="startDate" className="sr-only">Giriş Tarihi</label>
                                            <input type="date" value={startDate.toISOString().split("T")[0]} onChange={(evt) => {setStartDate(new Date(evt.target.value)) }} min={new Date().toISOString().split("T")[0]} name="startDate" id="startDate" />
                                        </div>
                                        <div className="form-group mb-2" style={{width: '125px'}}>
                                            <label htmlFor="endDate" className="sr-only">Çıkış Tarihi</label>
                                            <input type="date"  value={endDate.toISOString().split("T")[0]} onChange={(evt) => setEndDate(new Date(evt.target.value))} min={startDate?.toISOString().split("T")[0]}  name="endDate" id="endDate" />
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="endDate" className="sr-only">Kişi</label>
                                            <select className="form-select" value={person} onChange={(evt) => setPerson(Number(evt.target.value))} style={{ width: '70px' }} aria-label="Default select example">
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-special" style={{ width: '100%' }}>Uygula</button>
                                </form>
                            </div>
                            <br />
                            <div className="sidebar">
                                <h3> Filitreler </h3>
                                <hr />
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlInput1">Ara</label>
                                        <input type="text" className="form-control" placeholder="Otel Arayın" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="endDate" className="sr-only">Lokasyon</label>
                                        <select className="form-select" style={{ width: '100%' }} aria-label="Default select example">
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
                                    <br />
                                    <button className="btn btn-primary" style={{ width: '100%' }}>Ara</button>
                                </form>
                            </div>
                            <br />
                            <div className="sidebar">
                                <h3> Otel Özellikleri </h3>
                                <hr />
                                <div className="form-group">

                                    <>
                                        {
                                            taxonomy?.RESULT?.map((res, index) => {
                                                return (
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id={"tax-" + res.taxid} />
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
                        <div className="col-md-8 order-md-2 mb-8">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">


                                <>
                                    {
                                        product?.RESULT?.map((res, index) => {
                                            return (
                                                <div className="col">
                                                    <div className="card shadow-sm">
                                                        <div id={"otelImageSlider-"+index} className="carousel slide" data-interval="false">
                                                            <div className="carousel-inner">
                                                                
                                                                { res.pictures.map((evt,i) => {
                                                                    return <div className={"carousel-item " +  ((i == 0) ? 'active' : '')}>
                                                                    <img src={evt.file} className="d-block w-100" alt="..." />
                                                                </div>
                                                                })}
                                                            </div>
                                                            <button className="carousel-control-prev" type="button" data-bs-target={"#otelImageSlider-"+index} data-bs-slide="prev">
                                                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                                <span className="visually-hidden">Previous</span>
                                                            </button>
                                                            <button className="carousel-control-next" type="button" data-bs-target={"#otelImageSlider-"+index} data-bs-slide="next">
                                                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                                                <span className="visually-hidden">Next</span>
                                                            </button>
                                                        </div>
                                                        <div className="coloud-info">
                                                            <p>{res.location.city}, {res.location.district}</p>
                                                        </div>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{res.otel_name}</h5>
                                                            <div className="card-text">
                                                            

                                                                {
                                                                    res?.taxonomies.map((das, index) => {
                                                                        return (
                                                                            <div className="chips" >{das.name}</div>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                            <br />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="btn-group">
                                                                    <NavLink to={"/otel/"+res.pid} className="btn btn-primary">İncele</NavLink>
                                                                </div>
                                                                <small className="cart-price"><i> {fncGetDay()} Gece {bookDate?.person} Kişi </i>{fncGetDay() * person! *(res.rooms[0]?.price)} TL</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>






                            </div>
                            <div className="page-num">
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">2</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

List.propTypes = {}

export default List
