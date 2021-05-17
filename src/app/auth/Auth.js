import { Component } from 'react';
import { signUp, signIn } from '../../utils/todo-api.js';
import './Auth.css';

export default class Auth extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    const { isSignUp } = this.state;
    e.preventDefault();

    try {
      const action = isSignUp ? signUp : signIn;

      const user = await action(this.state);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSignUp = () => {
    this.handleSubmit(this.state);
  };

  handleSignIn = () => {
    this.handleSubmit(this.state);
  };

  handleSignUpToggle = (e) => {
    e.preventDefault();
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  render() {
    return (
      <div className='Auth'>
        <form onSubmit={this.handleSubmit}>
          {this.state.isSignUp && (
            <p>
              <label>
                Name
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                ></input>
              </label>
            </p>
          )}

          <p>
            <label>
              Email
              <input
                value={this.state.email}
                onChange={this.handleEmailChange}
              ></input>
            </label>
          </p>

          <p>
            <label>
              Password
              <input
                value={this.state.password}
                type='password'
                onChange={this.handlePasswordChange}
              ></input>
            </label>
          </p>

          {this.state.isSignUp ? (
            <button> Sign Up </button>
          ) : (
            <button> Sign In </button>
          )}

          {this.state.isSignUp ? (
            <button onClick={this.handleSignUpToggle}>
              {' '}
              Already have an account?{' '}
            </button>
          ) : (
            <button onClick={this.handleSignUpToggle}>
              {' '}
              Need to create account?{' '}
            </button>
          )}
        </form>
      </div>
    );
  }
}
