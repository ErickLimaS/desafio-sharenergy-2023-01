import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './Components/Layout/Layout';
import RandomStatusCode from './pages/Random Code Status';

function App() {
  return (

    <BrowserRouter>

      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/random-status-code' element={<RandomStatusCode />} />
          <Route path='/random-dog-image' element={(<><h1>Under work</h1> <p>Em uma terceira página, deve haver um botão de refresh que, ao ser clicado, deve retornar uma imagem aleatória da api Random Dog;</p></>)} />
          <Route path='/customers' element={(<><h1>Under work</h1> <p>Em uma quarta página, deve haver uma lista de clientes, através da qual o usuário deve ser capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, telefone, endereço e cpf.</p></>)} />

          <Route path='*' element={(<h1>Essa página não existe.</h1>)} />

        </Routes>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
