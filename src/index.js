import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {EasybaseProvider} from "easybase-react";
import ebconfig from "./ebconfig";
import {Provider} from "react-redux";
import store from "./store/index";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(

      <EasybaseProvider ebconfig={ebconfig}>
          <BrowserRouter>
              <Provider store={store}>
                  <App/>
              </Provider>
          </BrowserRouter>
      </EasybaseProvider>,
  document.getElementById('root')
);

