<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, Modal, Toast } from '@skeletonlabs/skeleton';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { storeCurrentUrl } from '$lib/stores';

	import NavHeader from '$lib/components/NavHeader.svelte';
	import NavSideBar from '$lib/components/NavSideBar.svelte';

	export let data;

	let loggedin = false;

	if (data.user) {
		loggedin = true;
	}

	afterNavigate((params) => {
		// Store current page route URL
		storeCurrentUrl.set($page.url.pathname);
		// Scroll to top
		const isNewPage = params.from && params.to && params.from.route.id !== params.to.route.id;
		const elemPage = document.querySelector('#page');
		if (isNewPage && elemPage !== null) {
			elemPage.scrollTop = 0;
		}
	});

	function matchPathWhitelist(pageUrlPath) {
		// If homepage route
		if (pageUrlPath === '/' || pageUrlPath === '/login' || pageUrlPath === '/register') return true;
		// If any blog route
		if (pageUrlPath.includes('/blog')) return true;
		return false;
	}

	$: slotSidebarLeft = matchPathWhitelist($page.url.pathname)
		? 'w-0'
		: 'bg-surface-50-900-token lg:w-auto';
</script>

<Modal />
<Toast position="t" />

<AppShell {slotSidebarLeft}>
	<svelte:fragment slot="header"><NavHeader {loggedin} /></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"
		><NavSideBar class="hidden lg:grid w-[360px] overflow-hidden" /></svelte:fragment
	>
	<div class="pt-4">
		<slot />
	</div>
</AppShell>
