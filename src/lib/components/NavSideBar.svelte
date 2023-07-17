<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import Icon from '$lib/components/Icon.svelte';
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<AppRail background="bg-transparent" border="border-r border-surface-500/30">
		<AppRailAnchor href="/docs" selected={$page.url.pathname === '/docs'}>
			<svelte:fragment slot="lead">
				<Icon name="book" width="1.5em" height="1.5em" />
			</svelte:fragment>
			<span>Docs</span>
		</AppRailAnchor>
		<!-- <hr class="opacity-30" /> -->
		<AppRailAnchor href="/wxc" selected={$page.url.pathname === '/wxc'}>
			<svelte:fragment slot="lead">
				<Icon name="phone-call" width="1.5em" height="1.5em" />
			</svelte:fragment>
			<span>Webex<br />Calling</span>
		</AppRailAnchor>
		<AppRailAnchor href="/wxcc" selected={$page.url.pathname === '/wxcc'}>
			<svelte:fragment slot="lead">
				<Icon name="headphones" width="1.5em" height="1.5em" />
			</svelte:fragment>
			<span>Webex CC</span>
		</AppRailAnchor>
	</AppRail>
</div>
