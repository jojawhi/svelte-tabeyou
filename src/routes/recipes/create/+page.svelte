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

	const handleDeleteInstruction = (index: number) => {
		console.log('Delete index:', index);

		const newInstructions = $newRecipeStore.instructions.filter((instruction, i) => {
			return i !== index;
		});

		console.log('New instructions:', newInstructions);

		newRecipeHandlers.deleteInstruction(newInstructions);
	};

	const handleAddInstruction = () => {
		newRecipeHandlers.addInstruction();

		console.log($newRecipeStore);
	};
</script>

<div class="container">
	<h1>Create new recipe</h1>
	<div>
		<form class="container" action="POST">
			<label for="name">Recipe Name:</label>
			<input bind:value={newRecipe.name} type="text" name="name" />
			<div class="container">
				<h2>Ingredients:</h2>
				{#each $newRecipeStore.ingredientList as ingredient, index}
					<div class="ingredient-container">
						<input bind:value={ingredient.name} placeholder="ingredient" />
						<input bind:value={ingredient.amount} placeholder="amount" />
						<input bind:value={ingredient.unit} placeholder="unit" />
						<button on:click|preventDefault={() => handleDeleteIngredient(index)}>Delete</button>
					</div>
				{/each}
				<button on:click|preventDefault={() => handleAddIngredient()}>+ Add ingredient</button>
			</div>
			{#if $newRecipeStore.instructions}
				<div>
					<h2>Instructions:</h2>
					{#each $newRecipeStore.instructions as instruction, index}
						<div class="container">
							<div>
								<span>{index + 1}</span>
								<input bind:value={instruction} type="text" placeholder="Instruction" />
								<button on:click|preventDefault={() => handleDeleteInstruction(index)}
									>Delete</button
								>
							</div>
						</div>
					{/each}
					<button on:click|preventDefault={() => handleAddInstruction()}>+ Add step</button>
				</div>
			{/if}

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
