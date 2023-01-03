import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './Components/Layout/Layout';

function App() {
  return (

    <BrowserRouter>

      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/random-status-code' element={(<><h1>Under work</h1> <p>Em uma segunda página, o usuário deve ser capaz de selecionar um status code http qualquer, e, após a seleção, deve ser retornada uma imagem da api HTTP Cat relacionada ao status escolhido, caso não exista tal imagem, deve ser retornada uma imagem de not found à critério de escolha do participante do desafio;</p></>)} />
          <Route path='/random-dog-image' element={(<><h1>Under work</h1> <p>Em uma terceira página, deve haver um botão de refresh que, ao ser clicado, deve retornar uma imagem aleatória da api Random Dog;</p></>)} />
          <Route path='/customers' element={(<><h1>Under work</h1> <p>Em uma quarta página, deve haver uma lista de clientes, através da qual o usuário deve ser capaz de cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro deve possuir nome, email, telefone, endereço e cpf.</p></>)} />

          <Route path='*' element={(<h1>Essa página não existe.</h1>)} />

        </Routes>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
