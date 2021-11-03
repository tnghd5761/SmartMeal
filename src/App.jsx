import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';

const App = () => {
  return (
		<Switch>
      <Header />
    </Switch>
  );
}

export default App;
