<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import Icon from '$lib/components/Icon.svelte';
	import { menuLinks } from '$lib/links';

	// import { storeCurrentUrl } from '$lib/stores';

	let categoryValue = undefined;
	// let filteredMenu = menuLinks;

	// Filter Links
	// function setCategory(c) {
	// 	categoryValue.set(c);
	// 	switch ($categoryValue) {
	// 		case 'docs':
	// 			filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'docs');
	// 			break;
	// 		case 'wxc':
	// 			filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'wxc');

	// 			break;
	// 		case 'wxcc':
	// 			filteredMenu = menuLinks.filter((linkSet) => linkSet.id === 'wxcc');
	// 			break;
	// 	}
	// }

	// page.subscribe((p) => {
	// 	let pathMatch = p.url.pathname.split('/')[1];
	// 	if (!pathMatch) return;
	// 	// if (['components', 'actions'].includes(pathMatch)) pathMatch = 'svelte';
	// 	setCategory(pathMatch);
	// });
	// categoryValue.subscribe((c) => setCategory(c));

	page.subscribe((page) => {
		// ex: /basePath/...
		let basePath = page.url.pathname.split('/')[1];
		if (!basePath) return;
		// Translate base path to link section
		if (['docs'].includes(basePath)) categoryValue = '/docs';
		if (['wxc'].includes(basePath)) categoryValue = '/wxc';
	});
	console.log('Category', categoryValue);
	// Reactive
	$: submenu = menuLinks[categoryValue ?? '/docs'];
	$: classesActive = (href) =>
		$page.url.pathname?.includes(href) ? 'bg-primary-active-token' : '';
</script>

<div
	class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 {$$props.class ??
		''}"
>
	<AppRail background="bg-transparent" border="border-r border-surface-500/30">
		<AppRailTile bind:group={categoryValue} name="docs" value={'/docs'}>
			<svelte:fragment slot="lead">
				<Icon name="book" width="2em" height="2em" />
			</svelte:fragment>
			<span>Docs</span>
		</AppRailTile>
		<hr class="opacity-30" />
		<AppRailTile bind:group={categoryValue} name="wxc" value={'/wxc'}>
			<svelte:fragment slot="lead">
				<Icon name="phone-call" width="2em" height="2em" />
			</svelte:fragment>
			<span>Webex<br />Calling</span>
		</AppRailTile>
		<!-- <AppRailAnchor href="/wxcc" selected={$page.url.pathname === '/wxcc'}>
			<svelte:fragment slot="lead">
				<Icon name="headphones" width="1.5em" height="1.5em" />
			</svelte:fragment>
			<span>Webex CC</span>
		</AppRailAnchor> -->
	</AppRail>
	<section class="p-4 pb-20 space-y-4 overflow-y-auto">
		{#each submenu as segment, i}
			<!-- Title -->
			<p class="font-bold pl-4 text-2xl">{segment.title}</p>
			<!-- Navigation List -->
			<nav class="list-nav">
				<ul>
					{#each segment.list as { href, label, badge }}
						<li>
							<a {href} class={classesActive(href)} data-sveltekit-preload-data="hover">
								<span class="flex-auto">{@html label}</span>
								{#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<!-- Divider -->
			{#if i + 1 < submenu.length}<hr class="!my-6 opacity-50" />{/if}
		{/each}
	</section>
</div>
