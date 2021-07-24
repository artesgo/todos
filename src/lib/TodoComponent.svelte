<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Todo } from '../state/todos';
	import { createUpdateItem, deleteItem } from '../state/todos-actions';
	export let todo: Todo;
</script>

<div class="grid row">
	<label>
		<input
			type="checkbox"
			bind:checked={todo.checked}
			on:change={() => createUpdateItem(todo, false)}
		/>
		<span class="checkmark">
			{#if todo.checked}
				<span class="checked" transition:fade={{ duration: 200 }} />
			{/if}
		</span>
		{todo.value}
	</label>
	<button on:click={() => deleteItem(todo)}>Delete</button>
</div>

<style>
	.grid {
		margin: 4px 0;
	}
	label {
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
	}
	label input {
		position: absolute;
		left: -5rem;
	}
	.checkmark {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		border: 1px solid #1e1e24;
		margin-right: 1rem;
		box-sizing: border-box;
	}
	.checked {
		width: 0.5rem;
		height: 0.5rem;
		background: #ff3e00;
		border: 1px solid #1e1e24;
	}
	input:focus + .checkmark,
	input:hover + .checkmark {
		border: 2px solid #1e1e24;
	}
</style>
