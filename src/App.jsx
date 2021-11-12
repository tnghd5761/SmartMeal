import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import MainPage from './pages/MainPage/Main';
import ItemlistPage from './pages/ItemlistPage/ItemlistPage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
		<Route path='/' exact component={MainPage} />
		<Route path='/list' exact component={ItemlistPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
