<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { store } from '../state/todos';
	import { addTodo, createList, parseStorage } from '../state/todos-actions';
	import { todoLists } from '../state/todos-selector';
	import TodoComponent from './TodoComponent.svelte';
	import type { Todo } from './../state/todos';
	import { search } from '../state/search';

	let expanded = {};
	let newItem = {};
	let _list = '';
	onMount(() => {
		chrome.storage.sync.get(null, (todos) => {
			if (!$store.populated) {
				parseStorage(todos);
				expanded = $todoLists.map((list) => {
					expanded = {
						...expanded,
						[list.list]: false,
					};
				});
			}
		});
	});

	function _sort(list: Todo[], by: string) {
		return list.sort((a, b) => {
			return a[by] - b[by];
		});
	}

	function _toggle(list) {
		expanded[list] = !expanded[list];
	}

	function _getItemLength(list: Todo[]) {
		return `(${list.length} item${list.length === 1 ? '' : 's'})`;
	}

	function _addItem(list: string, order: number) {
		let index = ++$store.index;
		addTodo(index, order, list, newItem[list]);
	}

	function _createList() {
		$search = '';
		createList(_list, ++$store.listOrder);
	}

	function _search() {
		$search = _list.toLowerCase();
	}

	$: hasFiltered = (list) => {
		if ($search !== '') {
			const filtered = $store.todos[list.order][list.list].filter((todo) => {
				return (
					todo.value.toLowerCase().indexOf($search) > -1 ||
					todo.list.toLowerCase().indexOf($search) > -1
				);
			});
			return filtered.length > 0;
		}
		return true;
	};
</script>

<div class="grid row">
	<label>
		<span class="sr-only">New List and Search</span>
		<input type="text" bind:value={_list} placeholder={`New List and Search`} on:keyup={_search} />
	</label>
	<button class="btn" on:click={_createList}>Create List</button>
</div>
<section>
	<!-- get list by keys -->
	{#each $todoLists as ordered}
		{#if hasFiltered(ordered)}
			<button class="accordion" on:click={() => _toggle(ordered.list)}>
				<h2 class="align-vertical">
					<img
						class:open={expanded[ordered.list]}
						src="/svg/arrow-down.svg"
						role="presentation"
						alt=""
						style="width: 2rem; height: 2rem;"
					/>
					{ordered.list.toUpperCase()}
					{_getItemLength($store.todos[ordered.order][ordered.list])}
				</h2>
			</button>
		{/if}
		{#if expanded[ordered.list]}
			<div class="list-container" transition:slide={{ duration: 200 }}>
				{#if hasFiltered(ordered)}
					<div class="list-adder grid row">
						<input
							type="text"
							bind:value={newItem[ordered.list]}
							placeholder={`Add item to ${ordered.list}`}
						/>
						<button class="btn" on:click={() => _addItem(ordered.list, ordered.order)}
							>Add Item</button
						>
					</div>
				{/if}
				{#each _sort($store.todos[ordered.order][ordered.list], 'id') as todo}
					{#if todo.value
						.toLowerCase()
						.indexOf($search) > -1 || todo.list.toLowerCase().indexOf($search) > -1}
						<TodoComponent {todo} />
					{/if}
				{:else}
					<div class="no-items">no todos</div>
				{/each}
			</div>
		{/if}
	{:else}
		<h2 class="no-items">
			You have no more to-dos
			<img
				class="sunny"
				src="/svg/sun.svg"
				role="presentation"
				alt=""
				style="width: 2rem; height: 2rem;"
			/>
		</h2>
	{/each}
</section>

<style lang="scss">
	@use '../styles/variables' as vars;

	label {
		display: block;
		position: relative;
	}
	h2 {
		font-size: 1rem;
		font-weight: 300;
	}
	h2 img {
		margin-right: 0.5rem;
		transform: rotate(180deg);
		transition: 200ms;
	}
	h2 img.open {
		transform: rotate(0deg);
	}
	input {
		position: relative;
		margin-left: 2rem;
		padding-left: 0.5rem;
		border-left: 2px solid vars.$hilight;
		height: 1.5rem;
		transition: 200ms;
	}
	input:hover,
	input:focus {
		border-left: 10px solid vars.$hilight;
	}
	input::before {
		content: '';
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		background: red;
		display: block;
		z-index: 2;
		border: 1px solid vars.$dark;
	}
	.list-adder input {
		border-right: none;
	}
	.accordion {
		padding: 0px;
		background: none;
		border: none;
		width: 100%;
		text-align: left;
	}
	.no-items {
		margin: 4px 0 4px 2.5rem;
	}

	h2.no-items {
		margin-top: 2rem;
		display: flex;
		align-items: center;
	}
	.sunny {
		animation: sun 3s infinite;
	}

	@keyframes sun {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(15deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
