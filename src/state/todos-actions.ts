import { store, Todo } from './todos';

export function parseStorage(storage) {
	let todos = [];
	for (let _todoKeys of Object.keys(storage)) {
		const { list, order, id } = storage[_todoKeys];
		createList(list, order);
		todos.push(storage[_todoKeys]);
		updateIndex(Number.parseInt(id));
		updateListOrder(Number.parseInt(order));
	}
	populateStore(todos);
}

/**
 * Populates the svelte store with data from local storage
 * @param todos
 */
function populateStore(todos: Todo[]) {
	const lists = {};
	todos.map((todo) => {
		const { list, order } = todo;
		if (lists[order] === undefined) {
			lists[order] = {};
			lists[order][list] = [];
		}
		lists[order][list].push(todo);
	});
	store.update((s) => ({
		...s,
		todos: lists,
	}));
}

/**
 * Tracks largest todo index for later use
 * @param index
 */
function updateIndex(index: number) {
	store.update((s) => ({
		...s,
		index: s.index > index ? s.index : index,
	}));
}

/**
 * order of the list
 * @param order
 */
function updateListOrder(order: number) {
	store.update((s) => ({
		...s,
		listOrder: s.listOrder > order ? s.listOrder : order,
	}));
}

/**
 * Creates new todo list
 * @param list
 * @param order
 */
export function createList(list: string, order: number) {
	store.update((s) => {
		if (s.todos[list] === undefined) {
			return {
				...s,
				todos: {
					...s.todos,
					[order]: {
						...s.todos[order],
						[list]: [],
					},
				},
			};
		}
		return s;
	});
}

/**
 * Create or Updates Todo Item in the svelte store
 * parses the todo and saves to local storage
 * @param todo
 * @param newItem
 */
export function createUpdateItem(todo: Todo, newItem?: boolean) {
	const { list, order } = todo;
	store.update((s) => ({
		...s,
		todos: {
			...s.todos,
			[order]: {
				[list]: []
					.concat(
						s.todos[order][list].map((t) => {
							if (t && t.id === todo.id) {
								t.checked = todo.checked;
								t.value = todo.value;
							}
							return t;
						}),
					)
					.concat(newItem ? [todo] : []),
			},
		},
	}));
	chrome.storage.sync.set({ [todo.id]: todo });
}

/**
 * Deletes the Todo Item
 * @param todo
 */
export function deleteItem(todo: Todo) {
	const { list, order } = todo;
	store.update((s) => ({
		...s,
		todos: {
			...s.todos,
			[order]: {
				[list]: [].concat(
					s.todos[order][list].filter((t) => {
						if (t && t.id !== todo.id) {
							return t;
						}
					}),
				),
			},
		},
	}));
	chrome.storage.sync.remove(`${todo.id}`, () => {
		console.log('removed', todo);
	});
}

/**
 * Use the parameters below to create the proper data to pass to createUpdate
 * @param id
 * @param order
 * @param list
 * @param value
 */
export function addTodo(id: number, order: number, list: string, value: string) {
	const todo: Todo = { id, value, checked: false, order, list };
	createUpdateItem(todo, true);
}
