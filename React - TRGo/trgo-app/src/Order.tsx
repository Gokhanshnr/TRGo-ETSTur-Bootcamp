import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar'
import { getOrderList, orderDelete } from './Service'
import { IOrder } from './models/IOrder'


function Order() {

    const [orderList, setOrderList] = useState<IOrder>()

    useEffect(() => {

        fncOrderList();

       
    }, [])

    const fncOrderList = () => {
        getOrderList().then(res => {
            const arr = res.data
            setOrderList(arr);
            console.log(orderList?.RESULT[0].end_Date.toString().split("T")[0])
        })
    }

    const fncDeleteOrder = (orderId:number ) => {

        orderDelete(orderId).then(res => {
            fncOrderList();
        })

    }



    return (
        <>
        <NavBar></NavBar>
            <div className='container'>
                <div className="my-3 p-3 bg-white rounded box-shadow">
                    <h3>Siparişlerim</h3>
                    <hr />

                    {orderList?.RESULT.map((evt,i) => { 

                        return <div className="card card-order">
                        <div className="row">
                            <div className="col-1">
                                <i className="bi bi-alarm-fill order-icon" />
                            </div>
                            <div className="col-4">
                                <strong className="d-inline-block mb-2 text-primary">{evt.room_name}</strong>
                                <h3 className="mb-0">
                                </h3><h3 className="text-dark" >{evt.otel_name}</h3>
                            </div>
                            <div className="col-3">
                                <div className="mb-1 text-muted"><strong>Tarih : </strong>{evt.start_date.toString().split("T")[0]} - {evt.end_Date.toString().split("T")[0]} </div>
                                <div className="mb-1 text-muted"><strong>Kişi Sayısı : </strong> {evt.person}</div>
                            </div>
                            <div className="col-4">
                                <div className="button-row">
                                    <p> Fiyat: {evt.price}TL</p>
                                    <button onClick={ () => fncDeleteOrder(evt.orderid) } className="btn btn-danger mb-2">İPTAL ET</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     })}
                    
                    
                </div>
            </div>
        </>


    )


}

Order.propTypes = {}

export default Order
