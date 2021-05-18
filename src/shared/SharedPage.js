import { Component } from 'react';
import { getSharedTodos } from '../utils/todo-api.js';
import './SharedPage.css';

export default class SharedPage extends Component {
state = {
  todos: []
}

componentDidMount = async () => {
  const response = await getSharedTodos();
  this.setState({ todos: response.body });
}
  
render() {
  const { todos } = this.state;
  return (
    <div className="SharedPage">
      <ul>
        {todos.map(todo => (
          <li key={todo.id}> {todo.task} </li>
        ))}
      </ul>
    </div>
  );
}

}