import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './Components/Layout/Layout';
import RandomStatusCode from './pages/Random Code Status';
import RandomDogImage from './pages/Random Dog Image';
import Customers from './pages/Customers';
import Register from './pages/Customers/Register';
import Update from './pages/Customers/Update';
import Delete from './pages/Customers/Delete';

function App() {
  return (

    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/random-status-code' element={<RandomStatusCode />} />
          <Route path='/random-dog-image' element={<RandomDogImage />} />
          <Route path='/customers/delete' element={<Delete />} />
          <Route path='/customers/update' element={<Update />} />
          <Route path='/customers/register' element={<Register />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={(<h1>Essa página não existe.</h1>)} />

        </Routes>

      </Layout>
    </BrowserRouter>

  );
}

export default App;
