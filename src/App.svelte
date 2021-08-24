<script lang="ts">
	import { onMount } from 'svelte';
	import { darkMode } from './darkMode';
	import Todo from './lib/Todo.svelte';

	onMount(() => {
		$darkMode = localStorage.getItem('darkMode') === 'true';
	});

	function toggleDarkMode() {
		$darkMode = !$darkMode;
		localStorage.setItem('darkMode', $darkMode ? 'true' : 'false');
	}
</script>

<div class="container" class:dark={$darkMode} class:light={!$darkMode}>
	<header>
		<button class="btn-icon" on:click={toggleDarkMode}>
			{#if $darkMode}
				<div class="sr-only">Show Light Mode</div>
				<img src="./svg/sun.svg" role="presentation" alt="" />
			{:else}
				<div class="sr-only">Show Dark Mode</div>
				<img src="./svg/moon.svg" role="presentation" alt="" />
			{/if}
		</button>
		<h1>Todo List</h1>
		<div class="spacer" />
	</header>
	<main>
		<Todo />
	</main>
	<footer>
		<a href="https://ko-fi.com/artesra" target="_blank">Coffee Fund</a>
		<a href="https://github.com/artesgo/todos/issues" target="_blank">Get Support</a>
	</footer>
</div>

<style lang="scss" global>
	@use '_globals';

	header {
		width: 100%;
		display: grid;
		grid-template-columns: 6rem 1fr 6rem;
		button {
			img {
				width: 32px;
				height: 32px;
			}
		}
	}

	footer {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}

	.grid {
		display: grid;
	}
	.grid.row {
		grid-template-columns: 1fr 5rem;
	}
	.align-vertical {
		display: flex;
		align-items: center;
	}
</style>
