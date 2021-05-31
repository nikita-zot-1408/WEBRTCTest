import React from 'react';

import Main from './src/components/Main';

import {ContextProvider} from './src/context/VideoContext';

class App extends React.Component {
  render() {
    return (
      <ContextProvider>
        <Main />
      </ContextProvider>
    );
  }
}

export default App;
