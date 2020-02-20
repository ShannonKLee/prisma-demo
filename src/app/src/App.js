import React, { Component } from 'react';
import './styles.css';
import { Feed } from './components/Feed';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Feed />
      </div>
    );
  }
}

export default App;
