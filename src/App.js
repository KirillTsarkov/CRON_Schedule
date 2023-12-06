import './App.css';
import React from 'react';
import Schedule from "./components/Schedule";


class App extends React.Component {
  render () {
    return (
    <div>
      <div className="main-body">
        <Schedule />
        </div>
    </div>
    )
  }
}

export default App;
