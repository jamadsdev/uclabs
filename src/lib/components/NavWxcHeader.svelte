<script>
	import { fade } from 'svelte/transition';
	import { toastStore } from '@skeletonlabs/skeleton';
	import * as api from '$lib/wxc_api.js';
	import Icon from '$lib/components/Icon.svelte';

	import { storeWxcToken, storeUserData } from '$lib/stores.js';

	let errorMsg = '';
	let visible = false;
	let validToken = false;
	// export let data;

	async function validateToken() {
		console.log('Start Token Validation');
		if (!$storeWxcToken['token']) {
			let t = {
				message: 'Error: Access Token Missing',
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		} else {
			// Get User Info
			const results = await api.get('people/me', $storeWxcToken['token']);
			$storeUserData['displayName'] = results.displayName;

			if (results.error) {
				let t = {
					message: `Error: ${results.message}. See docs for common issues`,
					timeout: 5000,
					background: 'variant-filled-error',
					width: 'max-w-[720px]'
				};
				toastStore.trigger(t);
			} else {
				// Get Organization Info
				const { items } = await api.get('organizations', $storeWxcToken['token']);
				$storeUserData['orgName'] = items[0].displayName;
				$storeWxcToken['valid'] = true;
			}
		}
	}

	function clearToken() {
		$storeWxcToken = [
			{
				token: '',
				valid: false
			}
		];
	}
</script>

<div class="grid grid-cols-3 gap-2 pl-5 lg:grid-cols-4">
	<div class="col-span-2">
		<input
			bind:value={$storeWxcToken['token']}
			class="input"
			id="token"
			name="token"
			type="password"
			placeholder="Webex Personal Access Token"
			disabled={$storeWxcToken['valid']}
		/>
	</div>
	<div>
		{#if $storeWxcToken['valid']}
			<button type="submit" class="btn variant-glass-primary" on:click={clearToken}
				>Clear Token</button
			>
		{:else}
			<button type="submit" class="btn variant-glass-primary" on:click={validateToken}
				>Validate Token</button
			>
		{/if}
	</div>
	{#if visible}
		<div class="col-span-2">
			<aside class="alert variant-filled-error" transition:fade|local={{ duration: 200 }}>
				<!-- Icon -->
				<div><Icon name="alert-octagon" height="2em" width="2em" /></div>
				<!-- Message -->
				<div class="alert-message">
					<!-- <h3 class="h3">Error</h3> -->
					<p>{errorMsg}</p>
				</div>
				<!-- Actions -->
				<div class="alert-actions">
					<button class="btn btn-sm bg-initial" on:click={dismiss}
						><Icon name="x-square" height="2em" width="2em" /></button
					>
				</div>
			</aside>
		</div>
	{/if}

	<div class="text-left col-span-3">
		{#if $storeWxcToken['valid']}
			<div class="grid grid-cols-4">
				<span class="h5">{$storeUserData['displayName']} :: {$storeUserData['orgName']} </span>
				<span class="h5 text-green-600">
					<Icon name="check-circle" title="Valid Token" height="1.5em" width="1.5em" />
				</span>
			</div>
		{:else}
			<span class="h4">&nbsp;</span>
		{/if}
	</div>
	<!-- <div class="col-start-3">Org: {$storeUserData['orgName']}</div> -->
</div>
