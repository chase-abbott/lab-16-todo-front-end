import request from 'superagent';

export async function signUp(credentials) {
  const response = await request.post('/api/auth/signup').send(credentials);
  return response.body;
}

export async function signIn(credentials) {
  const response = await request.post('/api/auth/signin').send(credentials);
  return response.body;
}

export async function addTodo(todo, token) {
  const response = await request
    .post('/api/todos')
    .set('Authorization', token)
    .send(todo);
  return response.body;
}