<script>
	/** @type {import('./$types').LayoutData} */
	import { AppShell } from '@skeletonlabs/skeleton';

	import { storeWxcToken } from '$lib/stores.js';

	export let data;

	function clearToken() {
		$storeWxcToken = '';
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-3 gap-2 lg:grid-cols-4">
			<div class="col-span-2 lg:col-start-2 lg:col-span-2">
				<input
					bind:value={$storeWxcToken}
					class="input"
					type="password"
					placeholder="Webex Personal Access Token"
				/>
			</div>
			<div>
				<button class="btn variant-glass-primary" on:click={clearToken}>Clear</button>
			</div>
		</div>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
