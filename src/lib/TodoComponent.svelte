<script lang="ts">
	import { darkMode } from '../darkMode';
	import { fade } from 'svelte/transition';
	import type { Todo } from '../state/todos';
	import { createUpdateItem, deleteItem } from '../state/todos-actions';
	export let todo: Todo;
</script>

<div class="grid row" class:dark={$darkMode} class:light={!$darkMode}>
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
	<button class="btn" on:click={() => deleteItem(todo)}>Delete</button>
</div>

<style lang="scss">
	@use '../styles/variables' as vars;

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
	.dark {
		.checkmark {
			border: 1px solid lighten(vars.$dark, 20%);
			background: lighten(vars.$dark, 10%);
		}
		input:focus + .checkmark,
		input:hover + .checkmark {
			border: 2px solid vars.$light;
		}
	}
	.light {
		.checkmark {
			border: 1px solid vars.$dark;
			background: darken(vars.$light, 10%);
		}
		input:focus + .checkmark,
		input:hover + .checkmark {
			border: 2px solid vars.$dark;
		}
	}
	.checkmark {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 1rem;
		box-sizing: border-box;
	}
	.checked {
		width: 0.5rem;
		height: 0.5rem;
		background: vars.$hilight;
		border: 1px solid vars.$dark;
	}
</style>
