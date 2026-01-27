import { ADD_TASK, DELETE_TASK} from './TaskActionTypes';

		export const addTaskAction = taskDescription => ({
			type: ADD_TASK,
			payload: taskDescription,
		});

		export const deleteTaskAction = taskDescription => ({
			type: DELETE_TASK,
			payload: taskDescription,
		});
