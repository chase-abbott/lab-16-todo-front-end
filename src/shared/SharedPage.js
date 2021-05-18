import { Component } from 'react';
import { getSharedTodos } from '../utils/todo-api.js';
import './SharedPage.css';

export default class SharedPage extends Component {
  state = {
    todos: [],
  };

  componentDidMount = async () => {
    const todos = await getSharedTodos();
    this.setState({ todos: todos });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className='SharedPage'>
        <div>
          <h1>Shared Todos</h1>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}> {todo.task} </li>
          ))}
        </ul>
      </div>
    );
  }
}
