import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import MainPage from './pages/MainPage/main';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
		<Route path='/' exact component={MainPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
