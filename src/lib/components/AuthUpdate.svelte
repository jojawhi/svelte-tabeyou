<script lang="ts">
	import { authHandlers, authStore } from '../../stores/authStore';

	let action = '';
	let email = '';
	let newEmail = '';
	let password = '';
	let newPassword = '';
	let confirmNewPassword = '';

	const handleSubmit = async () => {
		if (action === '') {
			return;
		}

		if (action === 'updatePassword') {
			return await authHandlers.updatePassword(newPassword);
		}

		if (action === 'updateEmail') {
			console.log(newEmail);
			return await authHandlers.updateEmail(newEmail);
		}
	};
</script>

<div class="signUpContainer">
	{#if action === ''}
		<div class="">
			<button on:click={() => (action = 'updateEmail')}>Change Email</button>
			<button on:click={() => (action = 'updatePassword')}>Change Password</button>
		</div>
	{/if}
	<form>
		{#if action === 'updatePassword'}
			<!-- <label for="email">
        <input bind:value={email} type="email" name="email" placeholder="Email">
      </label> -->
			<!-- <label for="password">
        <input bind:value={password} type="password" name="password" placeholder="Old Password">
      </label> -->
			<label for="password">
				<input
					bind:value={newPassword}
					type="password"
					name="password"
					placeholder="New Password"
				/>
			</label>
			<!-- <label for="confirmPassword">
          <input bind:value={confirmNewPassword} type="password" name="confirmPassword" placeholder="Confirm New Password">
      </label> -->
			<button on:click={handleSubmit} on:click={() => (action = '')} type="submit">Submit</button>
			<button on:click={() => (action = '')}>Cancel</button>
		{:else if action === 'updateEmail'}
			<label for="email">
				<input bind:value={newEmail} type="email" name="newEmail" placeholder="New email" />
			</label>
			<!-- <label for="password">
        <input bind:value={password} type="password" name="password" placeholder="Password">
      </label> -->
			<button
				on:click={handleSubmit}
				on:click={() => {
					action = '';
					newEmail = '';
				}}
				type="submit"
			>
				Submit
			</button>
			<button on:click={() => (action = '')}>Cancel</button>
		{/if}
	</form>
</div>

<style>
</style>
