import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/Main';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Mypage from './components/myinfo/Mypage/Mypage';
import Update from './components/myinfo/Update/Update';
import Delete from './components/myinfo/Delete/Delete';
import Inbody from './components/myinfo/Inbody/Inbody';
import insertHealth from './components/myinfo/insertHealth/insertHealth';
import MyCart from './pages/MyCart/MyCart'
import ItemlistPage from './pages/ItemlistPage/ItemlistPage';
import ItemDetailPage from './pages/ItemDetailPage/ItemDetailPage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/mypage' exact component={Mypage} /> 
        <Route path='/mypage/update' exact component={Update} /> 
        <Route path='/mypage/delete' exact component={Delete} /> 
        <Route path='/inbody' exact component={Inbody} />
        <Route path='/inbody/update' exact component={insertHealth} />
        <Route path='/mycart' exact component={MyCart} />
		    <Route path='/list' exact component={ItemlistPage} />
		    <Route path='/detail' exact component={ItemDetailPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
