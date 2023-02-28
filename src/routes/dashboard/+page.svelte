<script lang="ts">
	import AuthUpdate from '$lib/components/AuthUpdate.svelte';
	import { authStore, authHandlers } from '../../stores/authStore';
	import Recipes from '$lib/components/Recipes.svelte';

	// let email = $authStore.currentUser ? $authStore.currentUser?.email : 'None';

	let email: string | null | undefined;

	authStore.subscribe(storeState => {
		email = storeState?.currentUser?.email;
	});
</script>

{#if $authStore.currentUser}
	<div class="">
		<h1>Current User: {email ? email : '...'}</h1>
		<div class="dashboard-container">
			<div class="recipes-container">
				<h2>Recipes</h2>
				<Recipes user={$authStore.currentUser} />
			</div>
			<div class="grocery-list-container">
				<h2>Grocery List</h2>
			</div>
			<div class="meal-plan-container">
				<h2>Meal Plan</h2>
			</div>
		</div>

		<div>
			<AuthUpdate />
			<button on:click={() => authHandlers.signOut()}>Sign out</button>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}

<style>
	.dashboard-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.recipes-container {
		padding: 1rem;
		background-color: lightcoral;
	}

	.grocery-list-container {
		padding: 1rem;
		background-color: lightseagreen;
	}

	.meal-plan-container {
		grid-column: span 2;
		padding: 1rem;
		background-color: lightgray;
		margin-bottom: 1rem;
	}
</style>
