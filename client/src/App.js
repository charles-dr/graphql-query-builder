import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './utils/ApolloClient';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
