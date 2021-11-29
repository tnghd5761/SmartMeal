import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/main';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Inbody from './components/Inbody/Inbody';
import InsertHealth from './components/Inbody/InsertHealth';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/inbody' exact component={Inbody} />
        <Route path='/inbody/update' exact component={InsertHealth} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
