<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import Icon from '$lib/components/Icon.svelte';

	export let loggedin;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="btn btn-sm">
			<span><Icon name="coffee" height="2em" width="2em" /></span>
			<span class="pl-1 text-xl uppercase font-bold">UCLabs&nbsp</span>
			<Icon name="chevrons-left" height="1.5em" width="1.5em" />
			<!-- <div class="relative inline-block"> -->
			<span class="text-xl font-bold">Sirius</span>
			<span class="badge variant-filled-tertiary">Beta</span>
			<!-- </div> -->

			<Icon name="chevrons-right" height="1.5em" width="1.5em" />
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<!-- {#if !loggedin}
			<a href="/register" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="edit-3" height="1em" width="2em" /></span>
				<span>Register</span>
			</a>
			<a href="/login" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="log-in" height="1em" width="2em" /></span>
				<span>Login</span>
			</a>
		{:else}
			<a href="/settings" class="btn btn-sm variant-ghost-surface">
				<span><Icon name="settings" height="1em" width="2em" /></span>
				<span>Settings</span>
			</a>
			<form action="/logout" method="post">
				<button class="btn btn-sm variant-ghost-surface">
					<span><Icon name="log-out" height="1em" width="2em" /></span>
					<span>Logout</span>
				</button>
			</form>
		{/if} -->
	</svelte:fragment>
</AppBar>
