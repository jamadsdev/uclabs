<script>
	/** @type {import('./$types').PageData} */
	// export let data;
	import { AppShell } from '@skeletonlabs/skeleton';
	// import { TableOfContents } from '@skeletonlabs/skeleton';
	import LayoutContent from '$lib/layouts/LayoutContent.svelte';

	// export let tocKey = undefined;
</script>

<LayoutContent enableToc={true}>
	<header class="space-y-4">
		<h1 class="h1">Getting Started</h1>
		<p>
			This site will be under consistant development to add more features and utilities. I am hoping
			to cover things that admins don't have the ability to do in Control Hub. Eventually I will be
			expanding out to Webex Contact Center and Webex Meetings/Chat. More to come!!
		</p>
	</header>
	<h2 class="h2">Heading 01</h2>
	<h2 class="h2">Heading 02</h2>
	<h2 class="h2">Heading 03</h2>
</LayoutContent>
