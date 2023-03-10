<script lang="ts">
	import { authStore } from '../../stores/authStore';
	import RecipesList from '$lib/components/RecipesList.svelte';
	import type { User } from 'firebase/auth';
	import type { LayoutData } from './$types';

	// let user: User | null = $authStore.currentUser;
	export let data: LayoutData;
</script>

<div class="recipes">
	<aside class="recipe-list-container">
		<RecipesList />
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		width: 80%;
		max-width: 600px;
	}

	.recipes {
		display: flex;
		max-width: 1000px;
		background-color: lightgrey;
	}
</style>
