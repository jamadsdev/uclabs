<script>
	/** @type {import('./$types').LayoutData} */
	import { AppShell } from '@skeletonlabs/skeleton';

	import { storeToken } from '$lib/stores.js';

	export let data;
	let accessToken = '';

	function saveToken(value) {
		console.log('Token', accessToken);
		storeToken.update((value) => value);
		console.log('Submit', value);
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-3 lg:grid-cols-4">
			<div class="col-span-2 lg:col-start-2 lg:col-span-2">
				<input
					bind:value={accessToken}
					class="input"
					type="password"
					placeholder="Webex Access Token Goes Here"
				/>
			</div>
			<div>
				<button class="btn" on:click={saveToken(accessToken)}>Submit</button>
			</div>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
