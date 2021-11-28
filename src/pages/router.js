import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import EditProduk from './Product/editProduct';
import TambahProduk from './Product/addProduct';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Admin" element={<Admin />} />
                <Route path="/Admin/TambahProduk" element={<TambahProduk />} />
                <Route path="/Admin/EditProduk/:id" element={<EditProduk />} />
                <Route path="/AllProduct" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}