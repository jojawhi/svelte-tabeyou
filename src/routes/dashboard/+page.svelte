<script lang='ts'>
  import AuthUpdate from "$lib/components/AuthUpdate.svelte";
import { authStore, authHandlers } from "../../stores/authStore";

  // let email = $authStore.currentUser ? $authStore.currentUser?.email : 'None';

  let email: string;

  authStore.subscribe(storeState => {
    email = storeState?.currentUser?.email;
  })

</script>

{#if $authStore.currentUser}
  <div class="">
    <h1>Current User: {email ? email : '...'}</h1>
    <AuthUpdate />
    <button on:click={() => authHandlers.signOut()}>Sign out</button>
  </div>
{:else}
  <p>Loading...</p>
{/if}
