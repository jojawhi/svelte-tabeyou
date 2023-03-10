<script lang="ts">
	import { page } from '$app/stores';
	import type { RecipeType } from '../../../types';
	import Recipe from '$lib/components/Recipe.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { currentUser } = data;

	$: displayRecipe = data.recipes.find(recipe => {
		return recipe.slug === $page.params.slug;
	}) as RecipeType;
</script>

<div class="container">
	<Recipe recipe={displayRecipe} uid={currentUser.uid} />
</div>

<!-- <pre>
  {JSON.stringify($page, null, 2)}
</pre> -->
<style>
	.container {
		padding: 2rem;
	}
</style>
