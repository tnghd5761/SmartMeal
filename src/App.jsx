import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/main';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';


const App = () => {
  return (
    <>
      <Header />
      <Switch>
		    <Route path='/' exact component={MainPage} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
