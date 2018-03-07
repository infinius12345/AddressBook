import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

import CreatePage from './components/CreatePage'
import DetailPage from './components/DetailPage'

import 'tachyons'
import './index.css'

const httpLink = new HttpLink({uri: 'http://localhost:4000'})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router>
        <React.Fragment>

            <Switch>
              <Route exact path="/" component={CreatePage}/>
              <Route path="/edit/:id" component={CreatePage}/>
              <Route path="/contact/:id" component={DetailPage}/>
            </Switch>

        </React.Fragment>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
)
