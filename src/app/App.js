import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import Auth from './auth/Auth';
import TodoPage from '../todo/TodoPage';
import SharedPage from '../shared/SharedPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    id: window.localStorage.getItem('ID'),
    token: window.localStorage.getItem('TOKEN'),
  };

  handleUser = (id, token) => {
    window.localStorage.setItem('TOKEN', token);
    window.localStorage.setItem('ID', id);
    this.setState({ id: id, token: token });
  };

  render() {
    return (
      <div className='App'>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route
                path='/'
                exact={true}
                render={(routerProps) =>
                  this.state.token ? (
                    <Home {...routerProps} />
                  ) : (
                    <Redirect to='/signup' />
                  )
                }
              />

              <Route
                path='/signup'
                exact={true}
                render={(routerProps) => (
                  <Auth {...routerProps} onUser={this.handleUser} />
                )}
              />

              <Route
                path='/me/todos'
                render={(routerProps) =>
                  this.state.token ? (
                    <TodoPage {...routerProps} />
                  ) : (
                    <Redirect to='/signup' />
                  )
                }
              />

              <Route
                path='/todos'
                render={(routerProps) =>
                  this.state.token ? (
                    <SharedPage {...routerProps} />
                  ) : (
                    <Redirect to='/signup' />
                  )
                }
              />

              <Redirect to='/' />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
