import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/Main';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
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
        <Route path='/mycart' exact component={MyCart} />
		<Route path='/list' exact component={ItemlistPage} />
		<Route path='/detail' exact component={ItemDetailPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
