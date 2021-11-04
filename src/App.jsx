import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header path='/' component={Header} />
      <Switch>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
