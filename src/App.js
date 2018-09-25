/*
  src/App.js
*/

import React, { Component } from 'react';
//connect React component to Store using 'connect' React binding from 'react-redux'.
import { connect } from 'react-redux'; 
import { simpleAction } from './actions/action-initiators'
import logo from './logo.svg';
import './App.css';

/*
Map Redux State to Component Props

The mapStateToProps parameter of connect allows the React 
component to subscribe to redux state updates.
*/

const mapStateToProps = state => ({
  ...state
})

/*
The mapDispatchToProps parameter of connect can either be:

    1. an object of action creators wrapped into a dispatch.
    2. a function with a dispatch parameter. 
    The function should return an object that uses dispatch
    to bind action creators. Alternatively, you can use the 
    bindActionCreators() helper from redux
*/

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div>
    );
  }
}

//connect takes in two parameters: mapStateToProps and mapDispatchToProps.

export default connect(mapStateToProps, mapDispatchToProps) (App);
