<script lang="ts">
	import Todo from './lib/Todo.svelte';
</script>

<main>
	<Todo />
</main>

<style global>
	@font-face {
		font-family: 'Quicksand';
		src: local('Quicksand'), url('/font/static/Quicksand-Regular.ttf');
	}
	@font-face {
		font-family: 'QuicksandBold';
		src: local('QuicksandBold'), url('/font/static/Quicksand-Bold.ttf');
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	nav,
	main {
		width: 600px;
		margin: 0 auto;
		font-family: 'Quicksand' !important;
		box-sizing: border-box;
		color: #1e1e24;
	}

	main {
		min-height: 600px;
	}

	button {
		background: none;
		border: 1px solid #1e1e24;
		border-left: 2px solid #ff3e00;
		text-align: center;
	}

	input {
		border: 1px solid #1e1e24;
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
		width: 4px;
	}

	::-webkit-scrollbar-thumb {
		background: #ff3e00;
	}
</style>
