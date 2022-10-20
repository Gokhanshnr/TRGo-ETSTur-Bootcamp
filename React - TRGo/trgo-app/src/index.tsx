import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Member from './Member';
import Admin from './admin/Admin';
import Taxonomy from './admin/Taxonomy';
import Location from './admin/Location';
import Users from './admin/Users';
import List from './List';
import Otel from './Otel';
import Order from './Order';
import Profile from './Profile';
import OtelList from './admin/OtelList';
import OtelAdd from './admin/OtelAdd';
import RoomAdd from './admin/RoomAdd';

const routes = 
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/list' element={<List/>} />
    <Route path='/otel/:pid' element={<Otel />} />
    <Route path='/siparisler' element={<Order />} />
    <Route path='/profil' element={<Profile />} />
    <Route path='/member' element={<Member />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/admin/taxionomy' element={<Taxonomy />} />
    <Route path='/admin/location' element={<Location/>} />
    <Route path='/admin/user' element={<Users/>} />
    <Route path='/admin/otel/list' element={<OtelList/>} />
    <Route path='/admin/otel/add' element={<OtelAdd/>} />
    <Route path='/admin/room/add' element={<RoomAdd/>} />
  </Routes>
</BrowserRouter>



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( routes );