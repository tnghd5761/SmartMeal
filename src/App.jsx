import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './containers/Login/Login';


const App = () => {
  return (
    <>
      <Header path='/' component={Header} />
      <Switch>
        <Route path='/login' exact component={Login} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
