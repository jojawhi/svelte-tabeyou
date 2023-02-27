<script lang='ts'>
	import { authHandlers, authStore } from "../../stores/authStore";

 let register = false;
 let email = '';
 let password = '';
 let confirmPassword = '';

 const handleSubmit = async () => {
  if (!email || !password || (register && !confirmPassword)) {
    return;
  }

  if (register && password === confirmPassword) {
    try {
      await authHandlers.signUp(email, password);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await authHandlers.signIn(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  if ($authStore.currentUser) {
    window.location.href = '/dashboard';
  }
 }
</script>

<div class="signUpContainer">
  <h1>{register ? 'Sign up' : 'Sign in'}</h1>
  <form>
    <label for="email">
      <input bind:value={email} type="email" name="email" placeholder="Email">
    </label>
    <label for="password">
      <input bind:value={password} type="password" name="password" placeholder="Password">
    </label>
    {#if register}
      <label for="confirmPassword">
        <input bind:value={confirmPassword} type="password" name="confirmPassword" placeholder="Confirm Password">
      </label>

    {/if}
    <button on:click={handleSubmit} type="submit">{register ? 'Sign up' : 'Sign in'}</button>
  </form>
  {#if register}
    <p>Already have an account?</p>
    <div class="authButton" on:click={() => register = false} on:keydown={() => register = false}>Sign in!</div>
  {:else}
    <div class="authButton" on:click={() => authHandlers.resetPassword(email)} on:keydown={() => register = false}>Forgot your password?</div>
    <p>Don't have an account yet?</p>
    <div class="authButton" on:click={() => register = true} on:keydown={() => register = true}>Sign up!</div>
  {/if}

</div>

<style>
  .authButton {
    cursor: pointer;
    color: blue;
  }
</style>