<script lang="ts">
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { getRecipes } from '$lib/firebase/firebaseUtils';
	import { recipeStore } from '../../stores/recipeStore';

	export let user: User;

	onMount(async () => {
		const recipes = await getRecipes(user.uid);
		console.log(recipes);

		recipeStore.update((current: any) => {
			return { ...current, isLoading: false, recipes: recipes };
		});

		return recipes;
	});
</script>

<div class="container">
	{#each $recipeStore.recipes as recipe}
		<p>{recipe}</p>
	{/each}
</div>

<style>
</style>
