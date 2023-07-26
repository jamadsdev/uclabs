<script>
	export let parent;

	import * as api from '$lib/wxc_api';
	import { storeWxcToken } from '$lib/stores.js';
	import { modalStore } from '@skeletonlabs/skeleton';

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	let resArray = [
		{
			displayName: '',
			result: ''
		}
	];
	console.log('Modal Data', $modalStore[0].data.id);

	const submiteReset = async (user) => {
		const results = await api.post(
			`people/${user.id}/features/voicemail/actions/resetPin/invoke`,
			{},
			$storeWxcToken
		);
		resArray.displayName = user.displayName;
		resArray.result = results.result;
	};

	const result = submiteReset($modalStore[0].data);
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0]?.title}</header>
		<article>{$modalStore[0]?.body}</article>
		<div class="h4">{resArray['displayName']} :: {resArray['result']}</div>
	</div>
{/if}
