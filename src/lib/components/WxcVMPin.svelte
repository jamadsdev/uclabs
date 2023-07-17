<script>
	import { storeWxcToken } from '$lib/stores.js';
</script>

{#if $storeWxcToken === ''}
	Alert! Please submit your access token
{:else}
	The list of users will be displayed in a table here
{/if}
