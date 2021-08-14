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
</div>

<style lang="scss" global>
	@import './variables';

	@font-face {
		font-family: 'Quicksand';
		src: local('Quicksand'), url('/font/static/Quicksand-Regular.ttf');
	}
	@font-face {
		font-family: 'QuicksandBold';
		src: local('QuicksandBold'), url('/font/static/Quicksand-Bold.ttf');
	}

	body {
		margin: 0;
		padding: 0;
		width: 600px;
	}

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

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	nav,
	main {
		margin: 0 auto;
		font-family: 'Quicksand' !important;
		box-sizing: border-box;
	}

	.container {
		padding: 1rem;
		&.dark {
			background: $dark;
			color: $light;
			transition: 300ms;
			.btn {
				border: 1px solid lighten($dark, 20%);
				background: lighten($dark, 10%);
				color: $light;
			}
			input[type='text'] {
				border: 1px solid lighten($dark, 20%);
				background: lighten($dark, 10%);
				color: $light;
				&:focus {
					border: 1px solid lighten($dark, 40%);
				}
			}
			h2 {
				color: $light;
			}
		}
		&.light {
			background: $light;
			color: $dark;
			transition: 300ms;
			.btn {
				border: 1px solid $dark;
				background: darken($light, 10%);
				color: $dark;
			}
			input[type='text'] {
				background: darken($light, 10%);
				border: 1px solid darken($light, 10%);
				color: $dark;
				&:focus {
					border: 1px solid darken($light, 40%);
				}
			}
			h2 {
				color: $dark;
			}
		}
	}

	button {
		background: none;
		border: none;
	}

	button.btn {
		border-left: 2px solid $hilight;
		text-align: center;
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

	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-thumb {
		background: #ff3e00;
	}

	.sr-only {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
</style>
