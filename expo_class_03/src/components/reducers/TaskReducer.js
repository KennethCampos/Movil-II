import { ADD_TASK, DELETE_TASK} from '../actions/TaskActionTypes';

		const INITIAL_STATE = {
			todoTasks: [],
		};

		const TaskReducer = (state = INITIAL_STATE, action) => {
			const {todoTasks} = state;
			let taskDescription, newState;

			switch (action.type) {
				case ADD_TASK:
					taskDescription = action.payload;
					newState = {
						todoTasks: [...todoTasks, taskDescription],
					};
					return newState;

				case DELETE_TASK:
					taskDescription = action.payload;
					todoTasks.splice(todoTasks.indexOf(taskDescription), 1);
					newState = {
						todoTasks: [...todoTasks],
					};
					return newState;

				default:
					return state;
			}
		};

		export default TaskReducer;