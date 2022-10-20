import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addComment, addOrder, commentList, getProduct, getUser } from './Service'
import { IProductSingle } from './models/IProductSingle'
import { IComment } from './models/IComment'
import { control, setStDate, stDate } from './util'
import { IDate } from './models/IDate'
import { toast } from 'react-toastify'

function Otel() {

    const { pid } = useParams()
    const [product, setProduct] = useState<IProductSingle>()
    const [comments, setComments] = useState<IComment>()
    const [user, setUser] = useState<string>()
    const [commentText, setCommentText] = useState<string>()

    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [person, setPerson] = useState<number>(2)

    const [bookDate, setBookDate] = useState<IDate>()


    const navigate = useNavigate();

    useEffect(() => {

        if (stDate() != null) {
            const myStDate: IDate = stDate() as IDate;
            setBookDate(myStDate)
            setStartDate(new Date(myStDate.startDate!));
            setEndDate(new Date(myStDate.endDate!));
            setPerson(myStDate.person!)
        } else {
            console.log("Else çalıştı")
            const date = new Date()
            date.setDate(date.getDate() + 1);
            setEndDate(date)
            setStDate(startDate!, endDate!, person!)
            setBookDate(stDate()!)
        }



        getProduct(parseInt(pid!)).then(res => {
            const arr = res.data
            setProduct(arr)

        })


        getUser(control()!.RESULT?.username + "").then(res => {
            const arr = res.data
            
            setUser(arr?.RESULT.first_name+" "+ arr?.RESULT.last_name);
         
        })
        


        getComment();
    }, [])

    const getComment = () => {
        commentList(parseInt(pid!)).then(res => {
            const arr = res.data
            setComments(arr)
            console.log(arr);
        })
    }

    const fncAddComment = (evt: React.FormEvent) => {
        evt.preventDefault()
        try {
            addComment(commentText!, pid!).then(res => {
                const status: any = res.data;
                getComment();

            })
        } catch {
            console.log("Hata")
        }

    }

    const fncDateFormat = (val: number) => {
        const date = new Date();
        date.setTime(val)
        return date.toDateString()
    }

    const fncAddOrder = (roomId: number) => {
        try{
        addOrder(person, roomId, startDate.toISOString(), endDate.toISOString()).then(res => {
            const arr: any = res.data;
            toast.success("Siparişiniz Alındı")
            navigate('/siparisler')
        })}catch {
            toast.error("Giriş yapmanız gerekiyor.")
        }
    }
    

    const fncGetDay = () => {

        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
       
    }


    const fncStDateForm = (evt: React.FormEvent) => {
        evt.preventDefault()
        setStDate(startDate!, endDate!, person!);
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
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Konum</h6>
                                    </div>
                                    <span className="text-muted">{product?.RESULT.location.city} / {product?.RESULT.location.district}</span>
                                </li>
                                {
                                    product?.RESULT.taxonomies.map((evt, i) => {
                                        return <li className="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 className="my-0">{evt.name}</h6>
                                            </div>
                                        </li>

                                    })
                                }


                            </ul>
                        </div>
                        <div className="col-md-8 order-md-2 ">
                            <div id="otelImageCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner-otel">
                                {
                                    product?.RESULT.pictures.map((evt, i) => {
                                        return  <div className={"carousel-item " +  ((i == 0) ? 'active' : '')}>
                                        <img src={evt.file} className="d-block w-100" alt="..." />
                                    </div>
                                        
                                    })
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#otelImageCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#otelImageCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="otel-info">
                            <header>
                                <h2 style={{ color: '#0078AA' }}>{product?.RESULT.otel_name}</h2>
                                <div className="star">

                                    {[...Array((product?.RESULT.star_ratings))].map((x, i) => {
                                        return <i className="bi bi-star-fill" />
                                    }
                                    )}

                                </div>
                            </header>
                            <hr />
                            <article>
                                {product?.RESULT?.description}
                            </article>
                        </div>
                        <div className="room-list">
                            <header>
                                <h3>Oda Listesi</h3>
                            </header>
                            <ul className="rooms">

                                {
                                    product?.RESULT.rooms.map((evt, i) => {
                                        return <li>
                                            <div id={"room-" + i} className="carousel slide roomsCarousel" data-pause="hover" data-bs-ride="carousel">
                                                <div className="carousel-inner-otel">
                                                    {evt.pictures.map((res, i) => {
                                                        return <div className={"carousel-item " +  ((i == 0) ? 'active' : '')}>
                                                            <img src={res.file} className="d-block w-100" alt="..." />
                                                        </div>
                                                    })}
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target={"#room-" + i} data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target={"#room-" + i} data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div className="room-info">
                                                <h4>{evt.name}</h4>
                                                <div className="room-desc">
                                                    {evt.description}
                                                </div>
                                                <div className="button-row">
                                                    <p style={{ fontSize: '20px', backgroundColor: '#ebebeb' }}> Yatak : {evt.bed}</p>
                                                    <p> Fiyat: { fncGetDay() * person! * evt.price }TL</p>
                                                    <button onClick={() => fncAddOrder(evt.room_id)} className="btn btn-primary mb-2">Satın Al</button>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }

                            </ul>
                        </div>
                        <section className="comment">
                            {user != undefined &&
                                <div className="my-5" style={{ marginBottom: '0px !important' }}>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-12 col-lg-12">
                                            <div className="card text-dark">
                                                <div className="card-body p-4">
                                                    <div className="d-flex flex-start">
                                                        <img className="rounded-circle shadow-1-strong me-3" src="/img/profile_img.jpg" alt="avatar" width={60} height={60} />
                                                        <div style={{ width: '100%' }}>
                                                            <h6 className="fw-bold mb-1">{user}</h6>
                                                            <div className="d-flex align-items-center mb-3">
                                                            </div>
                                                            <form onSubmit={fncAddComment} className="comment-text">
                                                                <textarea className="form-control" onChange={(evt) => setCommentText(evt.target.value)} placeholder="Yorum yaz" id="commentTextArea" rows={3} defaultValue={""} />
                                                                <button type="submit" className="btn btn-primary">Gönder</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className=" my-2">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-12 col-lg-12">
                                        <div className="card text-dark">
                                            <h4 className="mb-0" style={{ margin: '20px' }}>Otel Yorumları</h4>

                                            {
                                                comments?.RESULT.map((evt, i) => {

                                                    return <> <hr />
                                                        <div className="card-body p-4">
                                                            <div className="d-flex flex-start">
                                                                <img className="rounded-circle shadow-1-strong me-3" src="/img/profile_img.jpg" alt="avatar" width={60} height={60} />
                                                                <div>
                                                                    <h6 className="fw-bold mb-1">{evt.first_name} {evt.last_name}</h6>
                                                                    <div className="d-flex align-items-center mb-3">
                                                                        <p className="mb-0">
                                                                            {fncDateFormat(evt.cdate)}
                                                                        </p>
                                                                    </div>
                                                                    <p className="mb-0">
                                                                        {evt.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                })
                                            }



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

Otel.propTypes = {}

export default Otel
