import { writable } from 'svelte/store';

export interface Todo {
	checked: boolean;
	id: number;
	value: string;
	list: string;
	order: number;
}

type TodoArrayDef = {
	[key: string]: Array<Todo>;
};

export type TodoState = {
	todos: {
		[index: number]: TodoArrayDef;
	};
	index: number;
	listOrder: number;
	populated: boolean;
};

const initialState: TodoState = {
	todos: {},
	index: 0,
	listOrder: 0,
	populated: false,
};

export const store = writable(initialState);
