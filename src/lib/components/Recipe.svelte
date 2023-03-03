<script lang="ts">
	import type { RecipeType } from '../../types';

	export let recipe: RecipeType;

	let edit = false;

	let newRecipe: RecipeType = {
		name: '',
		ingredientList: [],
		instructions: [],
	};

	const handleSubmit = () => {
		console.log(newRecipe);
	};
</script>

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
		{#if recipe.instructions && recipe.instructions[0]}
			{#each recipe.instructions as instruction, index}
				<div style="display: flex;">
					<span>{index + 1}</span>
					<input bind:value={instruction} type="text" name={`instruction ${index + 1}`} />
				</div>
			{/each}
		{:else}
			<p>No instructions. Edit this recipe to add some!</p>
		{/if}
	</form>
	<a href={`/recipes/${recipe.slug}/edit`}>Edit Recipe</a>
	<button>Delete Recipe</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
