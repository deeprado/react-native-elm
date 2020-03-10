import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppWithNavigationState from './redex/navigator/AppNavigators';
import configureStore from './redex/store';

const store = configureStore();

export default class App extends Component {
  render() {
    /**
     * 将store传递给App框架
     */
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
