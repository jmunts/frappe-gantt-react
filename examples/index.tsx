import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Example from './Example';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Example);
declare var module;
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Example', () => {
    render(Example)
  });
}
