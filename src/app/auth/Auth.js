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
    const { onUser, history } = this.props;
    e.preventDefault();

    try {
      const action = isSignUp ? signUp : signIn;

      const user = await action(this.state);

      onUser(user);

      history.push('/');
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

          <button>
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <button onClick={this.handleSignUpToggle}>
            {this.state.isSignUp ? 'Already have an account?' : 'Need to create and account?'}
          </button>
        </form>
      </div>
    );
  }
}
