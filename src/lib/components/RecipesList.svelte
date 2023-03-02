<script lang="ts">
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { getRecipes } from '$lib/firebase/firebaseUtils';
	import { recipeStore } from '../../stores/recipeStore';

	export let user: User;

	onMount(async () => {
		const recipes = await getRecipes(user.uid);
		console.log(recipes);

		recipeStore.update((currentStoreState: any) => {
			return { ...currentStoreState, isLoading: false, recipes: recipes };
		});

		return recipes;
	});
</script>

<div class="container">
	{#each $recipeStore.recipes as recipe}
		<a href={`/recipes/${recipe.slug}`}>{recipe.name}</a>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
