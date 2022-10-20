import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Homedesc from './components/Homedesc'
import { locationList } from './Service'
import { ILocation } from './models/ILocation'
import { setStDate, stDate } from './util'
import { useNavigate } from 'react-router-dom'


function Home() {


  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [person, setPerson] = useState<number>(2)

  const navigate = useNavigate();

  useEffect(() => {

    const date = new Date()
    date.setDate(date.getDate() + 1);
    setEndDate(date)

  }, [])


  const fncStDateForm = (evt: React.FormEvent) => {
    evt.preventDefault()

    setStDate(startDate!, endDate!, person!)
    navigate("/list");
  }



  return (
    <>
      <NavBar />

      <section className="py-5 text-center travel-main">
        <div className="search-tool">
          <h1>Tatilin Tadını Çıkarın</h1>
          <div className="search-form">
            <form onSubmit={fncStDateForm} className="form-search">
              <div className="form-group mb-2">
                <label htmlFor="startDate" className="sr-only">Giriş Tarihi</label>
                <input type="date" value={startDate.toISOString().split("T")[0]} onChange={(evt) => setStartDate(new Date(evt.target.value))} min={new Date().toISOString().split("T")[0]} name="startDate" id="startDate" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="endDate" className="sr-only">Çıkış Tarihi</label>
                <input type="date" value={endDate.toISOString().split("T")[0]} onChange={(evt) => setEndDate(new Date(evt.target.value))} min={startDate?.toISOString().split("T")[0]} name="endDate" id="endDate" />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="endDate" className="sr-only">Kişi Sayısı</label>
                <select className="form-select" onChange={(evt) => setPerson(Number(evt.target.value))} style={{ width: '80px' }} aria-label="Default select example">
                  <option value={1}>1</option>
                  <option value={2} selected>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Ara</button>
            </form>
          </div>
        </div>
      </section>
      <Homedesc></Homedesc>
    </>
  )
}


export default Home