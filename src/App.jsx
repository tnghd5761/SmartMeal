import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/main';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
		  <Route path='/' exact component={MainPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
