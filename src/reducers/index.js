const initialState ={
    tasks: [],                                        
    isLoading: false, 
    error: null
};
export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_TASK': {
            return { tasks: state.tasks.concat(action.payload) }
        }

        case 'FETCH_TASKS_FAILED': {        
            return {                          
                ...state,                       
                isLoading: false,               
                error: action.payload.error, 
             }
        }

        case 'EDIT_TASK': {
            const newTask = state.tasks.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, status: action.payload.status }
                } else {
                    return item
                }
            });
            return {
                ...state,
                tasks: newTask
            }
        }

        case 'FETCH_TASKS_SUCCEEDED': {
            return {
                ...state,
                tasks: action.payload.tasks,
                isLoading: false
            }
        }

        case 'CREATE_TASK_SUCCEEDED': {  
            return {
                tasks: state.tasks.concat(action.payload.task),
            }
        }


        case 'EDIT_TASK_SUCCEEDED': {                      
            const { payload } = action;
      return {
              tasks: state.tasks.map(task => {
                  if (task.id === payload.task.id) {           
                      return payload.task
                  }
                  return task
              }),
            }
        }

        default: return state
    }
}