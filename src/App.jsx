import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Mypage from './components/myinfo/Mypage/Mypage';
import Update from './components/myinfo/Update/Update';
import Delete from './components/myinfo/Delete/Delete';

const App = () => {
  return (
    <>
      <Header path='/' component={Header} />
      <Switch>
        <Route path='/mypage' exact component={Mypage} /> 
        <Route path='/mypage/update' exact component={Update} /> 
        <Route path='/mypage/delete' exact component={Delete} /> 
      </Switch>
      <Footer />
    </>
  );
}

export default App;
