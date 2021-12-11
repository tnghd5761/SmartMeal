import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/main';
import Mypage from './pages/Mypage/Mypage';
import Update from './pages/Update/Update';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Delete from './pages/Delete/Delete';
import Inbody from './pages/Inbody/Inbody';
import insertHealth from './pages/insertHealth/insertHealth';
import MyCart from './pages/MyCart/MyCart'
import ItemlistPage from './pages/ItemlistPage/ItemlistPage';
import ItemDetailPage from './pages/ItemDetailPage/ItemDetailPage';
import PurchasePage from './pages/PurchasePage/PurchasePage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/mypage' exact component={Mypage} /> 
        <Route path='/update' exact component={Update} /> 
        <Route path='/mypage/delete' exact component={Delete} /> 
        <Route path='/inbody' exact component={Inbody} />
        <Route path='/inbody/update' exact component={insertHealth} />
        <Route path='/mycart' exact component={MyCart} />
		      <Route path='/list' exact component={ItemlistPage} />
		      <Route path='/detail/:id' exact component={ItemDetailPage} />
		      <Route path='/purchase/:id' exact component={PurchasePage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
