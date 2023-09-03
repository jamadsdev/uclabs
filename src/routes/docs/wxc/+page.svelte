<script>
	/** @type {import('./$types').PageData} */
	// export let data;
	import LayoutContent from '$lib/layouts/LayoutContent.svelte';
	import VmPinReset from './VMPinReset.svelte';
	import VmNotify from './VMNotify.svelte';
</script>

<LayoutContent enableToc={true}>
	<header class="space-y-4">
		<h1 class="h1">Webex Calling Utilities</h1>
		<p />
	</header>
	<VmPinReset />
	<VmNotify />
	<div class="space-y-4">
		<h2 class="h2">Hoteling</h2>
		<p>Coming Soon</p>
	</div>
	<div class="space-y-4">
		<h2 class="h2">Call Forwarding</h2>
		<p>Coming Soon</p>
	</div>
</LayoutContent>
