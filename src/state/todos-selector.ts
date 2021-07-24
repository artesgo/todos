import { derived } from 'svelte/store';
import { store } from './todos';

export const todoLists = derived(store, (s) => {
	let todos: Array<{ order: number; list: string }> = [];
	// get order
	for (let order of Object.keys(s.todos)) {
		// just grab the first items list name
		if (!!order) {
			todos.push({
				order: Number.parseInt(order),
				list: Object.keys(s.todos[order])[0],
			});
		}
	}
	return todos;
});
