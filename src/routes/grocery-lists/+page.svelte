<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from './../../stores/authStore';
	import { groceryListStore, groceryHandlers } from './../../stores/groceryListStore';
	import { getGroceryLists } from '$lib/firebase/firebaseUtils';

	const user = $authStore.currentUser;
	console.log(user);

	onMount(async () => {
		const groceryLists = await getGroceryLists(user.uid);
		// console.log(groceryLists);

		groceryListStore.update((storeState: any) => {
			return { ...storeState, isLoading: false, items: groceryLists[0].listItems };
		});

		return groceryLists;
	});

	const handleAddItem = () => {
		groceryHandlers.addItem();
	};

	const handleDeleteItem = (index: number) => {
		const newItems = $groceryListStore.items.filter(item => {
			return item !== $groceryListStore.items[index];
		});

		groceryHandlers.deleteItem(newItems);
	};
</script>

<div>
	<h1>Grocery Lists</h1>
	{#each $groceryListStore.items as listItem, index}
		<div class="item-container">
			<input type="checkbox" />
			<input bind:value={listItem.name} />
			<input bind:value={listItem.amount} />
			<input bind:value={listItem.unit} />
			<button on:click={() => handleDeleteItem(index)}>Delete</button>
		</div>
	{/each}
	<button on:click={handleAddItem}>+ Add item</button>
</div>
