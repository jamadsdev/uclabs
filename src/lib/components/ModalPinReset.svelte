<script>
	export let parent;

	import * as api from '$lib/wxc_api';
	import { storeWxcToken } from '$lib/stores.js';
	import { modalStore, ProgressBar } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	let users = $modalStore[0].data;

	let resArray = [];
	let resetCount = 0;
	let resetProgress = undefined;
	// console.log('Modal Data', $modalStore[0].data.id);

	async function submitReset(user) {
		// Handles the PIN reset when the individual button is pressed
		if (!user.length) {
			resArray = {
				displayName: user.displayName,
				result: 'in progress...'
			};
			const results = await api.post(
				`people/${user.id}/features/voicemail/actions/resetPin/invoke`,
				{},
				$storeWxcToken['token']
			);
			resetProgress = 100;
			resArray.result = results.result;
		} else {
			resetCount = user.length;
			let j = 1;
			for (let i = 0; i < user.length; i++) {
				setTimeout(async () => {
					if (j === user.length) {
						resetProgress = 100;
					}

					// resetProgress = (j / resetCount) * 100;

					resArray = {
						count: j,
						displayName: user[i].displayName,
						result: 'Resetting PIN...'
					};

					const results = await api.post(
						`people/${user[i].id}/features/voicemail/actions/resetPin/invoke`,
						{},
						$storeWxcToken['token']
					);
					resArray.result = results.result;

					j++;
				}, i * 1500);
			}
		}
		// return status;
	}

	const result = submitReset($modalStore[0].data);
</script>

{#if $modalStore[0]}
	<div class="overflow-auto {cBase}">
		<header class={cHeader}>{$modalStore[0]?.title}</header>
		<!-- <article>{$modalStore[0]?.body}</article> -->
		<ProgressBar label="Progress Bar" value={resetProgress} min={0} max={100} />
		<div class="grid grid-cols-4 h-8">
			<div class="h4 col-span-2">
				{resArray.displayName}
			</div>

			<div class="h5 text-left">
				{#if resArray.result == 'success'}
					<Icon name="check" height="1.5em" width="1.5em" />
				{:else}
					{resArray.result}
				{/if}
			</div>
			{#if $modalStore[0].data.length}
				<div class="h5 text-center">{resArray.count} of {$modalStore[0].data.length}</div>
			{/if}
		</div>

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
		</footer>
	</div>
{/if}
