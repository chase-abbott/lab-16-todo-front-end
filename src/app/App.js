import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import Auth from './auth/Auth';
import TodoPage from '../todo/TodoPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    user: null,
    token: window.localStorage.getItem('TOKEN')
  }

  handleUser = user => {
    window.localStorage.setItem('TOKEN', user.token);
    this.setState({ token: user.token, user: user });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <main>

            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  <Home {...routerProps} />
                )}
              />

              <Route path="/signup" exact={true}
                render={routerProps => (
                  <Auth {...routerProps} onUser={this.handleUser} />
                )}
              />

              <Route path="/me/todos"
                render={routerProps => (
                  <TodoPage {...routerProps} />
                )}
              />

              <Redirect to="/" />

            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }

}

export default App;
