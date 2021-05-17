import request from 'superagent';

export async function signUp(credentials) {
  const response = await request.post('/api/auth/signup').send(credentials);
  return response.body;
}

export async function signIn(credentials) {
  const response = await request.post('/api/auth/signin').send(credentials);
  return response.body;
}

export async function addTodo(todo) {
  const response = await request
    .post('/api/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'))
    .send(todo);
  return response.body;
}

export async function getTodos() {
  const response = await request
    .get('/api/me/todos')
    .set('Authorization', window.localStorage.getItem('TOKEN'));
  return response.body;
}
