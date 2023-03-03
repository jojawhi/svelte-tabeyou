<script lang="ts">
	import { page } from '$app/stores';
	import type { RecipeType } from '../../../types';
	import Recipe from '$lib/components/Recipe.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: displayRecipe = data.recipes.find(recipe => {
		return recipe.slug === $page.params.slug;
	}) as RecipeType;
</script>

<div class="container">
	<Recipe recipe={displayRecipe} />

	<!-- <h1>{name}</h1>
	<div>
		{#each ingredientList as ingred}
			<div class="ingredient-container">
				<span>{ingred.name}</span>
				<span>{ingred.amount}</span>
				<span>{ingred.unit}</span>
			</div>
		{/each}
	</div>
	{#if instructions}
		<div>
			{#each instructions as instr, index}
				<p><span>{index + 1}. </span>{instr}</p>
			{/each}
		</div>
	{/if} -->
</div>

<!-- <pre>
  {JSON.stringify($page, null, 2)}
</pre> -->
<style>
	.container {
		padding: 2rem;
	}
</style>
