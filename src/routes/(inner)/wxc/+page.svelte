<script>
	/** @type {import('./$types').PageData} */
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	// Stores
	import { storeWxcToken, storeWxcTab, storeUserData } from '$lib/stores.js';
	// Components
	import WxcVmPin from '$lib/components/WxcVMPin.svelte';

	export let data;
</script>

<!-- Access Token: {$storeWxcToken} -->
<!-- Display Name: {$storeUserData['displayName']} -->
<!-- Org Name: {$storeUserData['orgName']} -->
<div class="pt-5">
	<TabGroup>
		<Tab bind:group={$storeWxcTab} name="tab1" value={0}>VM PIN Reset</Tab>
		<!-- <Tab bind:group={$storeWxcTab} name="tab2" value={1}>TBD</Tab> -->
		<!-- <Tab bind:group={$storeWxcTab} name="tab3" value={2}>Bulk Tasks</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if $storeWxcTab === 0}
				<WxcVmPin />
			{:else if $storeWxcTab === 1}
				(tab panel 2 contents)
			{:else if $storeWxcTab === 2}
				(tab panel 3 contents)
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
