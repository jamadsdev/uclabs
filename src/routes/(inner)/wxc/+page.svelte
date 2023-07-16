<script>
	/** @type {import('./$types').PageData} */
	import { storeToken } from '$lib/stores.js';

	export let data;
</script>

Access Token: {$storeToken}
