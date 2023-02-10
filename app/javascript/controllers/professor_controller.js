import { Controller } from "@hotwired/stimulus"
import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../store'
import 'react-toastify/dist/ReactToastify.css'

import App from '../panels/professor/App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fab)

// Connects to data-controller="professor"
export default class extends Controller {
  connect() {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  }
}
