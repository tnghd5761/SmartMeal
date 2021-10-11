import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { testPage } from './pages';

function App() {
  return (
    <BrowserRouter>
		<Switch>
			<Route exact path="/" component={testPage} />
    	</Switch>
    </BrowserRouter>
  );
}

export default App;
