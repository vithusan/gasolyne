import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllPost from './component/AllPost';
import SinglePost from './component/SinglePost'
import testComponent from './component/testComponent';
import Navbar from './component/Navbar'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div className="topNav">
            <Navbar />
          </div>
          <div className="mainContainer">
            <Switch>
              <Route exact path='/' component={AllPost} />
              <Route exact path='/singlepost/:id' component={SinglePost} />
              <Route exact path='/test/path' component={testComponent} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
