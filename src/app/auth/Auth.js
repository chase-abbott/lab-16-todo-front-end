import { Component } from 'react';
import './Auth.css';

export default class Auth extends Component {
  state = {
    isSignup: true,
    name: '',
    email: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }

  handleSignUp = () => {
    this.handleSubmit();
  }

  handleSignIn = () => {
    this.handleSubmit();
  }

  handleSignUpToggle = e => {
    e.preventDefault();
    this.setState({ isSignup: !this.state.isSignup });
  }

  render() {

    return (
      <div className="Auth">
        <form onSubmit={this.handleSubmit}>
          {this.state.isSignup &&
            <p>
              <label>
                Name
                <input value={this.state.name} onChange={this.handleNameChange}></input>
              </label>
            </p>
          }

          <p>
            <label>
              Email
              <input value={this.state.email} onChange={this.handleEmailChange}></input>
            </label>
          </p>

          <p>
            <label>
              Password
              <input value={this.state.password} type='password' onChange={this.handlePasswordChange}></input>
            </label>
          </p>

          {this.state.isSignup
            ? <button onClick={this.handleSignUp}> Sign Up </button>
            : <button onClick={this.handleSignIn}> Sign In </button>
          }

          {this.state.isSignup
            ? <button onClick={this.handleSignUpToggle}> Already have an account? </button>
            : <button onClick={this.handleSignUpToggle}> Need to create account? </button>
          }
        </form>
      </div>
    );
  }

}