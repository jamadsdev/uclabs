<script>
	import { fade } from 'svelte/transition';
	import { toastStore } from '@skeletonlabs/skeleton';
	import * as api from '$lib/wxc_api.js';
	import Icon from '$lib/components/Icon.svelte';

	import { storeWxcToken, storeUserData, wxcUsers } from '$lib/stores.js';

	let errorMsg = '';
	let visible = false;
	let validToken = false;
	let loadingState = false;

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
			loadingState = true;
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
				loadingState = false;
			} else {
				// Get Organization Info
				const { items } = await api.get('organizations', $storeWxcToken['token']);
				$storeUserData['orgName'] = items[0].displayName;
				$storeWxcToken['valid'] = true;
				loadingState = false;
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
		$wxcUsers = [];
	}
</script>

<div class="grid grid-rows-2 gap-2 pl-10 lg:pl-0">
	<div class="grid grid-cols-4 gap-2 lg:grid-cols-6">
		<div class="col-span-2 lg:col-span-3 lg:col-start-2">
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
	</div>
	<div class="grid grid-cols-4 gap-2 lg:grid-cols-6">
		<!-- <div class="text-left col-span-3"> -->

		<!-- <div class="h5 text-green-600 lg:col-start-2"> -->

		<div class="h4 col-span-3 lg:col-start-2">
			{#if $storeWxcToken['valid']}
				<span class="text-green-600">
					<Icon name="check-circle" title="Valid Token" />
				</span>

				<span class="pl-2">
					{$storeUserData['displayName']}
					<Icon name="chevrons-right" />
					{$storeUserData['orgName']}
				</span>
			{:else if loadingState}
				Validating Access Token...
			{:else}
				<span class="h4">&nbsp;</span>
			{/if}
		</div>
		<!-- </div> -->

		<!-- </div> -->
	</div>
	<!-- <hr /> -->
</div>
