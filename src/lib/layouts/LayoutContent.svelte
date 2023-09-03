<script>
	import { TableOfContents } from '@skeletonlabs/skeleton';

	export let enableToc = false;

	export let tocKey = undefined;
</script>

<div class="page-padding flex items-start gap-10">
	<div class="toc-content page-container-aside">
		<slot />
	</div>
	{#if enableToc}
		<div class="sticky top-10 hidden xl:block space-y-4 w-72">
			{#key tocKey}
				<TableOfContents target=".toc-content" minimumHeadings={1} />
			{/key}
		</div>
	{/if}
</div>
