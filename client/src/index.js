import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers:{
    authorization:localStorage.getItem('token')||""
  }
});

root.render(
  <Provider store={store}>
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
  </Provider>
);

