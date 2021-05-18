import { Component } from 'react';
import './TodoPage.css';
import {
  addTodo,
  getTodos,
  updateTodoCompleted,
  deleteTodo,
} from '../utils/todo-api.js';

export default class TodoPage extends Component {
  state = {
    todos: [],
    task: '',
  };

  componentDidMount = async () => {
    const updatedTodos = await getTodos();
    console.log(updatedTodos);
    this.setState({ todos: updatedTodos });
  };

  handleNewTodo = ({ target }) => {
    this.setState({ task: target.value });
  };

  handleAddTodo = async (e) => {
    e.preventDefault();
    const { task, todos } = this.state;
    try {
      if (task) {
        const todo = await addTodo({
          task: task,
          completed: false,
          shared: false,
        });
        const updatedTodos = [...todos, todo];
        this.setState({ task: '', todos: updatedTodos });
      } else {
        console.log('error: invalid todo');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  toggleComplete = async (updatedTodo) => {
    updatedTodo.completed = !updatedTodo.completed;
    const updatedDatabaseTodo = await updateTodoCompleted(updatedTodo);
    const updatedTodos = this.state.todos.map((todo) => {
      return todo.id === updatedDatabaseTodo.id ? updatedDatabaseTodo : todo;
    });
    this.setState({ todos: updatedTodos });
  };

  handleDelete = async (todo) => {
    const deletedTodo = await deleteTodo(todo);
    const updatedTodos = this.state.todos.filter(
      (todo) => todo.id !== deletedTodo.id
    );
    this.setState({ todos: updatedTodos });
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
              <li key={todo.id}>
                {todo.task}
                <input
                  type='checkbox'
                  onChange={() => this.toggleComplete(todo)}
                  checked={todo.completed}
                ></input>
                <button onClick={() => this.handleDelete(todo)}>X</button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}
