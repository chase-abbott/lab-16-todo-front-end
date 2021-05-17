import { Component } from 'react';
import './TodoPage.css';
import { addTodo } from '../utils/todo-api.js';

export default class TodoPage extends Component {
  state = {
    todos: [],
    task: '',
  };

  handleNewTodo = ({ target }) => {
    this.setState({ task: target.value });
  };

  handleAddTodo = async (e) => {
    e.preventDefault();
    const { task, todos } = this.state;
    try {
      const todo = await addTodo({
        task: task,
        completed: false,
        shared: false,
      });
      const updatedTodos = [...todos, todo];
      this.setState({ task: '', todos: updatedTodos });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { todos } = this.state;
    return (
      <div className='TodoPage'>
        <form onSubmit={this.handleAddTodo}>
          <label>
            <input
              value={this.state.task}
              onChange={this.handleNewTodo}
            ></input>
            <button> Add Todo </button>
          </label>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}> {todo.task} </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}
