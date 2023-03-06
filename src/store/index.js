import { createStore } from 'vuex'
import tasks from '@/assets/tasks.json';

export default createStore({
	state() {
		return {
			count: 0,
			task: {
				list: tasks
			}
		}
	},
	getters: {
		getTaskList(state) {
			if (localStorage.getItem('tasks')) {
				state.task.list = JSON.parse(localStorage.getItem('tasks'))
			}
			return state.task.list;
		},
		getTaskLast(state) {
			return state.task.list[state.task.list.length - 1];
		},
	},
	mutations: {
		addTask(state, task) {
			state.task.list.push(task);
		},
		removeTask(state, taskId) {
			state.task.list = state.task.list.filter(item => item.id !== taskId);
		},
		removeTaskList(state) {
			state.task.list = [];
		},
		editTask(state, task) {
			console.log("EDIT", task)
			const taskIndex = state.task.list.findIndex(item => item.id === task.id);
			if (taskIndex !== -1) {
				state.task.list.splice(taskIndex, 1, task);
			}
		},
		addToLocalStorage(state) {
			localStorage.setItem('tasks', JSON.stringify(state.task.list));
		},
		removeTaskListLocalStorage() {
			localStorage.removeItem('tasks');
		}
	},
	actions: {
		addTask({commit}, task) {
			commit('addTask', task)
			commit('addToLocalStorage')
		},
		removeTask({commit}, taskId) {
			commit('removeTask', taskId);
			commit('addToLocalStorage');
		},
		removeTaskList({commit}) {
			commit('removeTaskList');
			commit('removeTaskListLocalStorage');

		},
		editTask({commit}, task) {
			commit('editTask', task);
			commit('addToLocalStorage');
		},
		addToLocalStorage({commit}) {
			commit('addToLocalStorage');
		},
	}
})