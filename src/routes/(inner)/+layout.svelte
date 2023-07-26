<script>
	/** @type {import('./$types').LayoutData} */
	import { AppShell } from '@skeletonlabs/skeleton';

	import NavWxcHeader from '$lib/components/NavWxcHeader.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<NavWxcHeader />
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
</AppShell>
