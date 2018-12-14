import * as api from '../api'


function getTaskById(tasks, id) {
    return tasks.find(task => task.id === id)
}

function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task,
        },
    }
}

export function editTask(id, params={}) {
    return (dispatch, getState) => {
        console.log(getState())
        const task = getTaskById(getState().tasks.tasks, id)
        const updateTask = Object.assign({}, task, params )

        api.editTask(id, updateTask).then(resp=>{
            dispatch(editTaskSucceeded(resp.data))
        })
     }
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED',
    }
}
function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task
        }
    }
}

export function createTask({title, description, status='Unstarted'}) {
    return dispatch => {
        api.createTask({title, description, status}).then(resp => {
            dispatch(createTaskSucceeded(resp.data))
        })
    }
}

function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error,
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTasksStarted())

        api.fetchTasks()
            .then(resp => {
                setTimeout(dispatch(fetchTasksSucceeded(resp.data)), 2000)
            })
            .catch(err => {
                dispatch(fetchTasksFailed(err.message))
            })
    }
}