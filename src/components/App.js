import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Catalog from './Catalog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path='/browse/:domainId?/:subdomainId?' component={Catalog}/>
      </BrowserRouter>
    );
  }
}

export default App;
