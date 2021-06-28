import React from 'react';
import { BrowserRouter, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Test from './components/Test';

function RouterConfig({ history }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/test" exact component={Test} />
      </Switch>
    </BrowserRouter>
  );
}

export default RouterConfig;
