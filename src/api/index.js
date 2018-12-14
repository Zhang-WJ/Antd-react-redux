import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export function fetchTasks(){
    return client.get('/tasks')
}

export function createTask(params) {
    return client.post('/tasks', params)
}

export function editTask(id, params) {
    return client.put(`/tasks/${id}`, params)
}