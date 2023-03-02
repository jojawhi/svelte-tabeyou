<script lang="ts">
	import type { Recipe } from '../../types';

	export let recipe: Recipe;

	let edit = false;

	let newRecipe: Recipe = {
		name: '',
		ingredientList: [],
		instructions: [],
	};

	const handleSubmit = () => {
		console.log(newRecipe);
	};
</script>

{#if recipe}
	<div>
		<form class="container" action="POST">
			<input bind:value={recipe.name} type="text" name="name" />
			{#each recipe.ingredientList as ingredient, index}
				<div style="display: flex;">
					<input bind:value={ingredient.name} type="text" name={`ingredient ${index + 1} name`} />
					<input
						bind:value={ingredient.amount}
						type="number"
						name={`ingredient ${index + 1} amount`}
					/>
					<input bind:value={ingredient.unit} type="text" name={`ingredient ${index + 1} unit`} />
				</div>
			{/each}
			{#if recipe.instructions}
				{#each recipe.instructions as instruction, index}
					<div style="display: flex;">
						<span>{index + 1}</span>
						<input bind:value={instruction} type="text" name={`instruction ${index + 1}`} />
					</div>
				{/each}
			{:else}
				<p>No instructions</p>
			{/if}
		</form>
		<a href={`/recipes/${recipe.slug}/edit`}>Edit Recipe</a>
		<button>Delete Recipe</button>
	</div>
{:else}
	<div>
		<form class="container" action="POST">
			<label for="name">Recipe Name:</label>
			<input bind:value={newRecipe.name} type="text" name="name" />
			<label for="ingredient">Ingredients:</label>
			<input bind:value={newRecipe.ingredientList[0]} type="text" name="ingredient" />
			<label for="instruction">Instructions:</label>
			<input bind:value={newRecipe.instructions[0]} type="text" name="instruction" />
			<button on:click|preventDefault={handleSubmit} type="submit">Save Recipe</button>
		</form>
		<button>Cancel</button>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
