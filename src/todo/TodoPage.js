import { Component } from 'react';
import './TodoPage.css';
import { addTodo } from '../utils/todo-api.js';

export default class TodoPage extends Component {
  state = {
    todos: [],
    newTodo: {},
    token: window.localStorage.getItem('TOKEN')
  }

  handleNewTodo = ({ target }) => {
    const newTodo = {
      task: target.value,
      completed: false,
      shared: false
    };
    this.setState({ newTodo: newTodo });
  }

  handleAddTodo = async e => {
    e.preventDefault();
    const { newTodo, token, todos } = this.state;
    const todo = await addTodo(newTodo, token);
    this.setState({ todos: todos.push(todo) });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="TodoPage">
        <form onSubmit={this.handleAddTodo}>
          <label>
            <input value={this.state.newTodo.task} onChange={this.handleNewTodo}></input>
            <button> Add Todo </button>
          </label>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}> {todo.name} </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }

}