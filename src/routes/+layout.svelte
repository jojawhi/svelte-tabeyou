<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';

	import { auth } from '$lib/client/firebaseConfig';
	import { authStore } from '../stores/authStore';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { Updater } from 'svelte/store';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			console.log(user);
			authStore.update(current => {
				return { ...current, isLoading: false, currentUser: user };
			});

			if (browser) {
				if (!$authStore.currentUser && !$authStore.isLoading && window.location.pathname !== '/') {
					window.location.href = '/';
				}
			}
		});
		return unsubscribe;
	});
</script>

<div class="app">
	<Header user={$authStore.currentUser} />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
