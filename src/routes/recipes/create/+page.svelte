<script lang="ts">
	import type { PageData } from './$types';
	import type { RecipeType } from '../../../types';
	import { newRecipeStore, newRecipeHandlers } from '../../../stores/newRecipeStore';

	export let data: PageData;

	const { currentUser } = data;

	let newRecipe: RecipeType = {
		name: '',
		ingredientList: [],
		instructions: [],
	};

	const handleSubmit = () => {
		console.log(newRecipe);
	};

	const handleDeleteIngredient = (index: number) => {
		const newIngredients = $newRecipeStore.ingredientList.filter(ingredient => {
			return ingredient !== $newRecipeStore.ingredientList[index];
		});

		newRecipeHandlers.deleteIngredient(newIngredients);
	};

	const handleAddIngredient = () => {
		newRecipeHandlers.addIngredient();
	};
</script>

<div class="">
	<h1>Create new recipe</h1>
	<div>
		<form class="container" action="POST">
			<label for="name">Recipe Name:</label>
			<input bind:value={newRecipe.name} type="text" name="name" />
			<div class="container">
				<label for="ingredient">Ingredients:</label>
				{#each $newRecipeStore.ingredientList as ingredient, index}
					<div class="ingredient-container">
						<input bind:value={ingredient.name} placeholder="ingredient" />
						<input bind:value={ingredient.amount} placeholder="amount" />
						<input bind:value={ingredient.unit} placeholder="unit" />
						<button on:click={() => handleDeleteIngredient(index)}>Delete</button>
					</div>
				{/each}
				<button on:click={() => handleAddIngredient()}>+ Add ingredient</button>
			</div>
			<div class="container">
				<label for="instruction">Instructions:</label>
				<input bind:value={newRecipe.instructions[0]} type="text" name="instruction" />
			</div>

			<button on:click|preventDefault={handleSubmit} type="submit">Save Recipe</button>
		</form>
		<button>Cancel</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.ingredient-container {
		display: flex;
	}
</style>
